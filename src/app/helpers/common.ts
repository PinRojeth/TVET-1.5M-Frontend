export default class CommonUtil {
    public static removeKeys(jsonObject: any, keys: string[]) {
        let json = JSON.parse(JSON.stringify(jsonObject));
        for (var i = 0; i < keys.length; i++) {
            delete json[keys[i]];
        }
        return json
    }
}