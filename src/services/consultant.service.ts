import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import ConsultantModel from '@/models/consultant.model';
import { IConsultant } from '@/interfaces/consultant.interface';
import { CreateConsultantDto } from '@/dtos/consultant.dto';

class ConsultantService {
  public consultants = ConsultantModel;

  public async findAllConsultant(filter:any): Promise<IConsultant[]> {
    const consultants: IConsultant[] = await this.consultants.find(filter).populate('company').populate('specialties');
    return consultants;
  }

  public async findConsultantById(ConsultantId: string): Promise<IConsultant> {
    if (isEmpty(ConsultantId)) throw new HttpException(400, 'ConsultantId is empty');

    const findConsultant: IConsultant = await this.consultants.findOne({ _id: ConsultantId }).populate('specialties');;
    if (!findConsultant) throw new HttpException(409, "Consultant doesn't exist");

    return findConsultant;
  }

  public async createConsultant(ConsultantData: CreateConsultantDto): Promise<IConsultant> {
    if (isEmpty(ConsultantData)) throw new HttpException(400, 'ConsultantData is empty');

    const findConsultant: IConsultant = await this.consultants.findOne({ name: ConsultantData.name });
    if (findConsultant) throw new HttpException(409, `This name ${ConsultantData.name} already exists`);

    const createConsultantData: IConsultant = await this.consultants.create({ ...ConsultantData });

    return createConsultantData;
  }

  public async updateConsultant(consultantId: string, consultantData: CreateConsultantDto): Promise<IConsultant> {
    if (isEmpty(consultantData)) throw new HttpException(400, 'ConsultantData is empty');

    const updateConsultantById: IConsultant = await this.consultants.findByIdAndUpdate(consultantId, { 
        name: consultantData.name,
     });
    if (!updateConsultantById) throw new HttpException(409, "Consultant doesn't exist");

    return updateConsultantById;
  }

  public async deleteConsultant(ConsultantId: string): Promise<IConsultant> {
    const deleteConsultantById: IConsultant = await this.consultants.findByIdAndDelete(ConsultantId);
    if (!deleteConsultantById) throw new HttpException(409, "Consultant doesn't exist");

    return deleteConsultantById;
  } 
}

export default ConsultantService;
