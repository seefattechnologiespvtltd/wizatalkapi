import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import CompanyModel from '@/models/company.model';
import { ICompany } from '@/interfaces/company.interface';
import { CreateCompanyDto } from '@/dtos/company.dto';

class CompanyService {
  public Companys = CompanyModel;

  public async findAllCompany(): Promise<ICompany[]> {
    const Companys: ICompany[] = await this.Companys.find();
    return Companys;
  }

  public async findCompanyById(CompanyId: string): Promise<ICompany> {
    if (isEmpty(CompanyId)) throw new HttpException(400, 'CompanyId is empty');

    const findCompany: ICompany = await this.Companys.findOne({ _id: CompanyId });
    if (!findCompany) throw new HttpException(409, "Company doesn't exist");

    return findCompany;
  }

  public async createCompany(CompanyData: CreateCompanyDto): Promise<ICompany> {
    if (isEmpty(CompanyData)) throw new HttpException(400, 'CompanyData is empty');

    const findCompany: ICompany = await this.Companys.findOne({ name: CompanyData.name });
    if (findCompany) throw new HttpException(409, `This name ${CompanyData.name} already exists`);

    const createCompanyData: ICompany = await this.Companys.create({ ...CompanyData });

    return createCompanyData;
  }

  public async updateCompany(CompanyId: string, CompanyData: CreateCompanyDto): Promise<ICompany> {
    if (isEmpty(CompanyData)) throw new HttpException(400, 'CompanyData is empty');

    if (CompanyData.name) {
      const findCompany: ICompany = await this.Companys.findOne({ name: CompanyData.name });
      if (findCompany && findCompany._id != CompanyId) throw new HttpException(409, `This name ${CompanyData.name} already exists`);
    }

    const updateCompanyById: ICompany = await this.Companys.findByIdAndUpdate(CompanyId, { CompanyData });
    if (!updateCompanyById) throw new HttpException(409, "Company doesn't exist");

    return updateCompanyById;
  }

  public async deleteCompany(CompanyId: string): Promise<ICompany> {
    const deleteCompanyById: ICompany = await this.Companys.findByIdAndDelete(CompanyId);
    if (!deleteCompanyById) throw new HttpException(409, "Company doesn't exist");

    return deleteCompanyById;
  } 
}

export default CompanyService;
