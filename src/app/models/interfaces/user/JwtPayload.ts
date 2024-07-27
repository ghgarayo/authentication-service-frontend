import {JwtPayload} from "jwt-decode";

export interface JwtPayloadImpl extends JwtPayload{
		sub: string;
		name: string;
		iat: number;
		exp: number;
}
