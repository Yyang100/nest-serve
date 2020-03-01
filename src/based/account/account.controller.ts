import { HttpCode, Controller, Post, Get, Put, Delete, Query, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { QueryAccountDto, CreateAccountDto, UpdateAccountDto, AccountDto, AccountPaginationDto } from './account.dto';
import { getIp } from '../../common';

@ApiTags('账号')
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  @ApiOperation({ summary: '查询列表' })
  @ApiResponse({ status: 200, type: AccountPaginationDto })
  findAll(@Query() data: QueryAccountDto) {
    return this.service.findAndCount(data);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询详情' })
  @ApiResponse({ status: 200, type: AccountDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '添加' })
  async create(@Body() data: CreateAccountDto, @Req() req) {
    await this.service.create({ ...data, reg_ip: getIp(req) });
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑' })
  async update(@Param('id') id: string, @Body() data: UpdateAccountDto) {
    await this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
  }
}
