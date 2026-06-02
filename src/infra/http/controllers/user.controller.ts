import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GetAllUsersUseCase } from "src/app/use-cases/user/get-all-users.use-case";
import { GetUserByIdUseCase } from "src/app/use-cases/user/get-user-by-id.use-case";
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { CreateUserUseCase } from "src/app/use-cases/user/create-user.use-case";
import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { UpdateUserUseCase } from "src/app/use-cases/user/update-user.use-case";
import { DeleteUserUseCase } from "src/app/use-cases/user/delete-user.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    @Get()
    async getAllUsers() {
        return this.getAllUsersUseCase.execute();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return this.getUserByIdUseCase.execute(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return this.createUserUseCase.execute(user);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
        return this.updateUserUseCase.execute(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.deleteUserUseCase.execute(id);
    }
}