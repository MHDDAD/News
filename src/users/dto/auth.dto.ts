import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, IsInt } from "class-validator";
import { RoleType } from "../constants/users.constants";

export class SignupDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;


  @IsString()
  @IsNotEmpty()
  lastName: string;


  @IsNotEmpty()
  phone: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;


  @IsOptional()
  role: RoleType    // use for create post just with admin role
}


export class SigninDto{

  
  @IsNotEmpty()
  phone: string;
  

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;

}

