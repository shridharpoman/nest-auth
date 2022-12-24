import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@Req() req: Request) {
    const user = req.user;
    return this.userService.getMe(user['sub']);
  }

  @Patch('edit')
  editUser(@Req() req: Request, @Body() dto: EditUserDto) {
    const user = req.user;

    return this.userService.editUser(user['sub'], dto);
  }
}
