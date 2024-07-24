import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import roleModel from '@/models/role.model';
import { IRole } from '@/interfaces/role.interface';
import { CreateRoleDto } from '@/dtos/role.dto';

class RoleService {
  public roles = roleModel;

  public async findAllRole(): Promise<IRole[]> {
    const roles: IRole[] = await this.roles.find();
    return roles;
  }

  public async findRoleById(roleId: string): Promise<IRole> {
    if (isEmpty(roleId)) throw new HttpException(400, 'RoleId is empty');

    const findRole: IRole = await this.roles.findOne({ _id: roleId });
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    return findRole;
  }

  public async findRoleByName(name: string): Promise<IRole> {
    if (isEmpty(name)) throw new HttpException(400, 'Name is empty');

    const findRole: IRole = await this.roles.findOne({ name: name });
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    return findRole;
  }

  public async createRole(roleData: CreateRoleDto): Promise<IRole> {
    if (isEmpty(roleData)) throw new HttpException(400, 'RoleData is empty');

    const findRole: IRole = await this.roles.findOne({ name: roleData.name });
    if (findRole) throw new HttpException(409, `This name ${roleData.name} already exists`);

    const createRoleData: IRole = await this.roles.create({ ...roleData });

    return createRoleData;
  }

  public async updateRole(roleId: string, roleData: CreateRoleDto): Promise<IRole> {
    if (isEmpty(roleData)) throw new HttpException(400, 'RoleData is empty');

    if (roleData.name) {
      const findRole: IRole = await this.roles.findOne({ name: roleData.name });
      if (findRole && findRole._id != roleId) throw new HttpException(409, `This name ${roleData.name} already exists`);
    }

    const updateRoleById: IRole = await this.roles.findByIdAndUpdate(roleId, { roleData });
    if (!updateRoleById) throw new HttpException(409, "Role doesn't exist");

    return updateRoleById;
  }

  public async deleteRole(roleId: string): Promise<IRole> {
    const deleteRoleById: IRole = await this.roles.findByIdAndDelete(roleId);
    if (!deleteRoleById) throw new HttpException(409, "Role doesn't exist");

    return deleteRoleById;
  } 
}

export default RoleService;
