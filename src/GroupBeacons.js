import {beacons} from './beacons.js';
import locate from 'multilateration';

const sortBeacons = filterScanResults => {
  let sortedBeacons = [];

  filterScanResults.forEach(beacon => {
    const beaconExists = sortedBeacons.find(b => b.id === beacon.id); ///potrebno dodati sortiranje i po imenu
    if (!beaconExists) {
      sortedBeacons.push({...beacon, rssi: [beacon.rssi]});
    } else beaconExists.rssi.push(beacon.rssi);
  });
  // console.log('sortirani rezultati:', sortedBeacons);
  return sortedBeacons;
};

export default function GroupBeacons(filterScanResults) {
  let beaconDistance = [];

  /* console.log('Calling groupBeacons'); */
  let newBeacons = [];
  newBeacons = sortBeacons(filterScanResults);

  ////////////// AVERAGES ///////////

  const avg = require('average-array');

  let beaconAverages = [];

  for (let i = 0; i < newBeacons.length; i++) {
    let element = avg(newBeacons[i].rssi);
    newBeacons[i].avg = element;
  }

  beaconAverages = newBeacons;

  // console.log('average:', beaconAverages);

  ////////////////// FORMULA ///////////////////

  let d_noisless = 0;
  const d_0 = 1;
  const RSSI_1m = -54;
  const n = 1.6;

  for (let i = 0; i < beaconAverages.length; i++) {
    let distance = Math.log10((RSSI_1m - beaconAverages[i].avg) / (10 * n));
    beaconAverages[i].d = distance;
  }

  beaconDistance = beaconAverages;

  console.log('distance:', beaconDistance);

  //////////////// POSITION /////////////////

  for (let i = 0; i < beaconDistance.length; i++) {
    for (let j = 0; j < beacons.length; j++) {
      if (
        beaconDistance[i].name === beacons[j].name ||
        beaconDistance[i].id === beacons[j].id
      ) {
        beaconDistance[i].pos = beacons[j].pos;
      }
    }
  }

  return beaconDistance;
}
