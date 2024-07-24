import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import CountryModel from '@/models/country.model';
import { ICountry } from '@/interfaces/country.interface';
import { CreateCountryDto } from '@/dtos/country.dto';

class CountryService {
  public countryModel = CountryModel;

  public async findAllCountry(): Promise<ICountry[]> {
    const countries: ICountry[] = await this.countryModel.find();
    return countries;
  }

  public async findCountryById(countryId: string): Promise<ICountry> {
    if (isEmpty(countryId)) throw new HttpException(400, 'CountryId is empty');

    const findCountry: ICountry = await this.countryModel.findOne({ _id: countryId });
    if (!findCountry) throw new HttpException(409, "Country doesn't exist");

    return findCountry;
  }


  public async createCountry(CountryData: CreateCountryDto): Promise<ICountry> {
    if (isEmpty(CountryData)) throw new HttpException(400, 'CountryData is empty');

    const findCountry: ICountry = await this.countryModel.findOne({ name: CountryData.name });
    if (findCountry) throw new HttpException(409, `This name ${CountryData.name} already exists`);

    const createCountryData: ICountry = await this.countryModel.create({ ...CountryData });

    return createCountryData;
  }

  public async updateCountry(CountryId: string, CountryData: CreateCountryDto): Promise<ICountry> {
    if (isEmpty(CountryData)) throw new HttpException(400, 'CountryData is empty');

    if (CountryData.name) {
      const findCountry: ICountry = await this.countryModel.findOne({ name: CountryData.name });
      if (findCountry && findCountry._id != CountryId) throw new HttpException(409, `This name ${CountryData.name} already exists`);
    }

    const updateCountryById: ICountry = await this.countryModel.findByIdAndUpdate(CountryId, { CountryData });
    if (!updateCountryById) throw new HttpException(409, "Country doesn't exist");

    return updateCountryById;
  }

  public async deleteCountry(CountryId: string): Promise<ICountry> {
    const deleteCountryById: ICountry = await this.countryModel.findByIdAndDelete(CountryId);
    if (!deleteCountryById) throw new HttpException(409, "Country doesn't exist");

    return deleteCountryById;
  } 
}

export default CountryService;
