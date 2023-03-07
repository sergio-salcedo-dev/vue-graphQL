/**
 * @class RocketModel
 * @property {?string} id
 * @property {?string} name
 * @property {?string} description
 * @property {?string} urlWikipedia
 * @property {?number} costPerLaunch
 * @property {?number} weight
 */
export default class RocketModel {
  constructor(params = {}) {
    this.id = params.id ?? null;
    this.name = params.name ?? null;
    this.description = params.description ?? null;
    this.costPerLaunch = params.costPerLaunch ?? null;
    this.weight = params.mass?.kg ?? null;
    this.urlWikipedia = params.urlWikipedia ?? null;
  }
}
