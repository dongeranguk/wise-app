import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async findByName(name: string): Promise<User[]> {
        return this.userModel.find({ name }).exec();
    }

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    async update(id: string, updateData: Partial<User>): Promise<User | null> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();

        if(!updateUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return updateUser;
        
    }

    async delete(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}