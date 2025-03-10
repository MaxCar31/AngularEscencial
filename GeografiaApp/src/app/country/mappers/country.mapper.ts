import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  static mapCountryListFromRestCountries(restCountries : RESTCountry): Country {
    return {
      cca2: restCountries.cca2,
      flag: restCountries.flag,
      flagSvg: restCountries.flags.svg,
      name: restCountries.translations['spa'].common ?? 'No spanish name',
      capital: restCountries.capital.join(',') ?? 'No capital',
      population: restCountries.population,
      region: restCountries.region,
      subRegion: restCountries.subregion,
    }
  }

  static mapCountryListFromRestCountriesArray(restCountries : RESTCountry[]): Country[] {
    return restCountries.map(this.mapCountryListFromRestCountries);
  }


}
