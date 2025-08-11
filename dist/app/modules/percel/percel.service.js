"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelService = void 0;
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const percel_interface_1 = require("./percel.interface");
const percel_model_1 = require("./percel.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createParcel = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = `trackId_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const info = Object.assign(Object.assign({}, payload), { trackingId, statusLogs: [
            {
                status: 'REQUESTED',
                updatedBy: user.userId,
                updatedAt: new Date(),
            },
        ] });
    const parcel = yield percel_model_1.Parcel.create(info);
    return parcel;
});
const cancelParcel = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parcel = yield percel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'parcel does not exist');
    }
    if ((_a = parcel.statusLogs) === null || _a === void 0 ? void 0 : _a.some(status => status.status === percel_interface_1.ParcelStatus.DISPATCHED || percel_interface_1.ParcelStatus.IN_TRANSIT)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, "parcel is already DISPATCHED . you can't cancel it now");
    }
    if ((_b = parcel.statusLogs) === null || _b === void 0 ? void 0 : _b.some(status => status.status === percel_interface_1.ParcelStatus.CANCELLED)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, "parcel is already cancelled .. you can't change the status");
    }
    const changableParcel = yield percel_model_1.Parcel.findByIdAndUpdate(id, {
        $set: {
            currentStatus: percel_interface_1.ParcelStatus.CANCELLED,
        },
        $push: {
            statusLogs: {
                status: percel_interface_1.ParcelStatus.CANCELLED,
                updatedBy: user.userId,
                updatedAt: new Date(),
            },
        },
    }, { new: true, runValidators: true });
    return changableParcel;
});
const confirmParcel = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parcel = yield percel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'parcel does not exist');
    }
    if ((_a = parcel.statusLogs) === null || _a === void 0 ? void 0 : _a.some(status => status.status === percel_interface_1.ParcelStatus.CANCELLED)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, "parcel is already cancelled .. you can't change the status");
    }
    if ((_b = parcel.statusLogs) === null || _b === void 0 ? void 0 : _b.some(status => status.status === percel_interface_1.ParcelStatus.DELIVERED)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, "parcel is already delivered .. you can't change the status");
    }
    const changableParcel = yield percel_model_1.Parcel.findByIdAndUpdate(id, {
        $set: {
            currentStatus: percel_interface_1.ParcelStatus.DELIVERED,
        },
        $push: {
            statusLogs: {
                status: percel_interface_1.ParcelStatus.DELIVERED,
                updatedBy: user.userId,
                updatedAt: new Date(),
            },
        },
    }, { new: true, runValidators: true });
    return changableParcel;
});
const finterParcelByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredParcel = yield percel_model_1.Parcel.find({ currentStatus: status });
    if (filteredParcel.length === 0) {
        throw new appError_1.default(403, `No parcel found in the status of ${status}`);
    }
    const totalFilterdParcel = filteredParcel.length;
    return {
        data: filteredParcel,
        meta: {
            total: totalFilterdParcel,
        },
    };
});
const changeParcelStatus = (id, user, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parcel = yield percel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "parcel does not exist");
    }
    if ((_a = parcel.statusLogs) === null || _a === void 0 ? void 0 : _a.some(status => status.status === percel_interface_1.ParcelStatus.CANCELLED)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, "parcel is cancelled .. you can't change the status");
    }
    if ((_b = parcel.statusLogs) === null || _b === void 0 ? void 0 : _b.some(singleStatus => singleStatus.status === status)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_GATEWAY, `You have already ${status} this parcel`);
    }
    const changableParcel = yield percel_model_1.Parcel.findByIdAndUpdate(id, {
        $set: {
            currentStatus: status,
        },
        $push: {
            statusLogs: {
                status: status,
                updatedBy: user.userId,
                updatedAt: new Date(),
            },
        },
    }, { new: true, runValidators: true });
    return changableParcel;
});
const myParcel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = user.userId;
    const sendedParcel = yield percel_model_1.Parcel.find({ sender: userId });
    const receivedParcel = yield percel_model_1.Parcel.find({ receiver: userId });
    if (sendedParcel.length === 0 && receivedParcel.length === 0) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'No parcels found');
    }
    const parcel = { sendedParcel, receivedParcel };
    return parcel;
});
const allParcel = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield percel_model_1.Parcel.find();
    const totalParcel = yield percel_model_1.Parcel.countDocuments();
    if (parcel.length === 0) {
        throw new appError_1.default(http_status_codes_1.default.NO_CONTENT, 'No Parcel Found');
    }
    return {
        data: parcel,
        meta: {
            total: totalParcel,
        },
    };
});
const ParcelByTrackingId = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield percel_model_1.Parcel.findOne({ trackingId: trackingId });
    return parcel;
});
const deleteParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield percel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'parcel does not exist');
    }
    const result = yield percel_model_1.Parcel.findOneAndDelete({ _id: id });
    return result;
});
exports.ParcelService = {
    createParcel,
    cancelParcel,
    changeParcelStatus,
    myParcel,
    ParcelByTrackingId,
    allParcel,
    confirmParcel,
    deleteParcel,
    finterParcelByStatus,
};
