import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import specialityModel from '@/models/speciality.model';
import { ISpeciality } from '@/interfaces/speciality.interface';
import { CreateSpecialityDto } from '@/dtos/speciality.dto';

class specialityService {
  public specialitys = specialityModel;

  public async findAllspeciality(): Promise<ISpeciality[]> {
    const specialitys: ISpeciality[] = await this.specialitys.find();
    return specialitys;
  }

  public async findspecialityById(specialityId: string): Promise<ISpeciality> {
    if (isEmpty(specialityId)) throw new HttpException(400, 'specialityId is empty');

    const findspeciality: ISpeciality = await this.specialitys.findOne({ _id: specialityId });
    if (!findspeciality) throw new HttpException(409, "speciality doesn't exist");

    return findspeciality;
  }

  public async findspecialityByName(name: string): Promise<ISpeciality> {
    if (isEmpty(name)) throw new HttpException(400, 'Name is empty');

    const findspeciality: ISpeciality = await this.specialitys.findOne({ name: name });
    if (!findspeciality) throw new HttpException(409, "speciality doesn't exist");

    return findspeciality;
  }

  public async createspeciality(specialityData: CreateSpecialityDto): Promise<ISpeciality> {
    if (isEmpty(specialityData)) throw new HttpException(400, 'specialityData is empty');

    const findspeciality: ISpeciality = await this.specialitys.findOne({ name: specialityData.name });
    if (findspeciality) throw new HttpException(409, `This name ${specialityData.name} already exists`);

    const createspecialityData: ISpeciality = await this.specialitys.create({ ...specialityData });

    return createspecialityData;
  }

  public async updatespeciality(specialityId: string, specialityData: CreateSpecialityDto): Promise<ISpeciality> {
    if (isEmpty(specialityData)) throw new HttpException(400, 'specialityData is empty');

    if (specialityData.name) {
      const findspeciality: ISpeciality = await this.specialitys.findOne({ name: specialityData.name });
      if (findspeciality && findspeciality._id != specialityId) throw new HttpException(409, `This name ${specialityData.name} already exists`);
    }

    const updatespecialityById: ISpeciality = await this.specialitys.findByIdAndUpdate(specialityId, { specialityData });
    if (!updatespecialityById) throw new HttpException(409, "speciality doesn't exist");

    return updatespecialityById;
  }

  public async deletespeciality(specialityId: string): Promise<ISpeciality> {
    const deletespecialityById: ISpeciality = await this.specialitys.findByIdAndDelete(specialityId);
    if (!deletespecialityById) throw new HttpException(409, "speciality doesn't exist");

    return deletespecialityById;
  } 
}

export default specialityService;
