import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtToken extends PassportStrategy(Strategy) {
        constructor() {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'ключ'
            });
        }

        async validate(payload: any) {
            return {userId: payload.sub, username: payload.username};
        }
}