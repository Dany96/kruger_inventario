// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export function api(url: string, endpoint: string) {
  return url + endpoint;
}

export const environment = {
  production: false,
  //_url: 'http://192.168.0.168:8080',
  name: '(DEV)',
  version: '1.0',
  version_date: '03/04/2022',
  idInscriptionTick: 0,
  _url: 'http://localhost:4200',

  api,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
