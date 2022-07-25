import React, {useState, useEffect} from 'react';
import Map from './Map';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {BleManager, Device, State} from 'react-native-ble-plx';
import {ThemeProvider} from 'react-native-elements';
import {beacons} from './beacons.js';
import GroupBeacons from './GroupBeacons.js';
import locate from 'multilateration';

const App = () => {
  var scanResults = [];

  const [userX, setUserX] = useState(100);
  const [userY, setUserY] = useState(100);

  const [bleState, setBleState] = useState(State.Unknown);
  const [error, setError] = useState<any>('-');
  const [devices, setDevices] = useState<Device[]>([]);
  const [beaconDistance, setBeaconDistance] = useState<any[]>([]);

  const deviceManager = new BleManager();

  var calcTime = 1000; // Vrijeme ponavljanja funkcije za izracun distance
  var distTime = 750; // Razlika u vremenu
  const startOfApplication = new Date().getTime();

  useEffect(() => {
    console.log('Calculating user position...');
    let userPosition = [];
    if (beaconDistance.length >= 2) {
      for (var i = 0; i < beacons.length; i++) {
        for (var j = 0; j < beaconDistance.length; j++) {
          if (
            beacons[i].id === beaconDistance[j].id ||
            beacons[i].name === beaconDistance[j].name
          ) {
            let deviceTemp = {
              x: beacons[i].pos.X,
              y: beacons[i].pos.Y,
              distance: beaconDistance[j].d,
            };
            userPosition.push(deviceTemp);
          }
        }
      }
      let pozicija = locate(userPosition);
      console.log('====================================');
      console.log(pozicija.x);
      console.log(pozicija.y);
      console.log('====================================');

      setUserX(pozicija.x);
      setUserY(pozicija.y);
    }
  }, [beaconDistance]);

  setInterval(() => {
    const startInterval = new Date().getTime();

    var filterScanResults = scanResults.filter(result => {
      return startInterval - result.timestamp <= distTime;
    });
    // console.log('filtrirani rezultati:', filterScanResults);
    scanResults = []; // Delete all scanned results

    setBeaconDistance(GroupBeacons(filterScanResults));
  }, calcTime);

  deviceManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.log(error);
      return;
    } else if (!device) {
      console.log('Device not present');
      return;
    }
    const index = jsonpar.findIndex(b => {
      if (device) return b.id === device.id || b.name === device.name;
    });
    if (index === -1) {
      return;
    }
    let device_temp = {
      id: device.id,
      name: device.name,
      rssi: device.rssi,
      timestamp: new Date().getTime(),
    };
    // @Luka: Add device to scanResults
    scanResults.push(device_temp);
  });

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.statusPanel}>
          <Map
            userPos={{userX, userY}}
            beaconList={jsonpar}
            beaconDistance={beaconDistance}
          />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

var beaconsLength = beacons.length;
var jsonstr = JSON.stringify(beacons);
var jsonpar = JSON.parse(jsonstr);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusPanel: {
    flex: 0,
    marginBottom: 15,
  },
});

export default App;
