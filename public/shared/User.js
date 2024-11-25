var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity, Fields } from "remult";
import bcrypt from 'bcrypt';
let User = class User {
    constructor() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.password = '';
    }
};
__decorate([
    Fields.uuid()
], User.prototype, "id", void 0);
__decorate([
    Fields.string()
], User.prototype, "name", void 0);
__decorate([
    Fields.string()
], User.prototype, "email", void 0);
__decorate([
    Fields.string({
        includeInApi: false,
        saving: (_, record) => __awaiter(void 0, void 0, void 0, function* () {
            record.value = yield bcrypt.hash(record.value, 7);
        })
    })
], User.prototype, "password", void 0);
User = __decorate([
    Entity("users", { allowApiCrud: true })
], User);
export { User };
