import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Controller("account")
export class JwtAuthGuard {
    @UseGuards(AuthGuard)
    @Get()
    getAccount(@Request() req) {
        return req.user;
    }
}