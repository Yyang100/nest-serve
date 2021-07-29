import { Entity } from 'typeorm';
import { AccountEntity } from '@app/public-class';
import { Column, ApiProperty, ApiPropertyEnum, ColumnEnum } from '@app/public-decorator';

/**
 * 状态
 */
export const accountAdminStatus = ['未审核', '已审核', '已冻结'];

/**
 * 数据实体
 */
@Entity()
export class AccountAdmin extends AccountEntity {
  @ApiProperty('角色')
  @Column('角色', 36)
  roleId: string;

  @ApiPropertyEnum('状态', accountAdminStatus)
  @ColumnEnum('状态', accountAdminStatus)
  status: number;
}
