import { environment } from '../../environments/environment';

export class Constant {
    public static FLICKR_API_URL = 'https://api.flickr.com';
    public static FLICKR_SERVICE = '/services/rest';
    public static BASE_URL = Constant.FLICKR_API_URL + Constant.FLICKR_SERVICE
        + '?api_key=' + environment.flickr_api_key + '&format=json&nojsoncallback=1';
    public static GENERAL_PER_PAGE = 500;
    public static HOME_TYPE = 'home';
}
