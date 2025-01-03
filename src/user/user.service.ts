import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    getById(id:string){
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }
    getByEmail(email:string){
        return this.prisma.user.findUnique({
            where: {
                email
            },
        })
    }
    async getProfile(id:string){
        const profile = await this.getById(id)
        
        const {password, ...rest} = profile

        return {
            user: rest
        }

    }
    async create(dto:RegisterDto){
       const user = {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
        laterality: dto.laterality,
        version: dto.version,
        currentRange: dto.currentRange,
       }
       return this.prisma.user.create({
        data: user,
       })
    }

    async update(dto:UpdateUserDto){

        const {id: userId, ...user} = dto

       return this.prisma.user.update({
        where: {
            id: userId
        },
        data: user,
       })
    }
}
