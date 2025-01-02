import { Controller, Post, Get, Param, Query, Body, Put, Delete, Patch } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user-dto";
import { CreateUserDto } from "./dto/create-user-dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

    @Post(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Get('search')
    async getUserByName(@Query('name') name: string) {
        return this.userService.findByName(name);
    }

    @Put(':id')
    async modifyUser(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
        return this.userService.update(id, updateData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const result = await this.userService.delete(id);

        if(result) {
            return { message: 'User deleted successfully', result };
        }

        return { message: 'User not found' };
    }
    

}