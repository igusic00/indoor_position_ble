import React, {useState, useEffect} from 'react';
import Svg, {SvgXml} from 'react-native-svg';

export default ({userPos, beaconList, beaconDistance}) => {
  const {userX, userY} = userPos;

  return (
    <SvgXml
      xml={xml(userX, userY, beaconList, beaconDistance)}
      width="100%"
      height="80%"
    />
  );
};

const xml = (userX, userY, jsonpar, beaconDistance) => {
  const drawUser = (userX, userY) => {
    return ` <circle cx="${userX}" cy="${userY}" r="20" stroke="black" stroke-width="3" fill="red" />`;
  };

  const drawBeacons = jsonpar => {
    var bcons = [];
    let beaconsLength = jsonpar.length;

    for (var i = 0; i < beaconsLength; i++) {
      let bcn = ` <circle cx="${jsonpar[i].pos.X}" cy="${
        jsonpar[i].pos.Y
      }" r="10" stroke="black" stroke-width="3" fill="blue" />
        <text x="${jsonpar[i].pos.X - 5}" y="${
        jsonpar[i].pos.Y - 15
      }" stroke="black" stroke-width="1px" font-size="20" >${i + 1}</text>`;
      bcons.push(bcn);
    }
    return `${bcons.join('')}`;
  };

  const drawCircle = (jsonpar, beaconDistance) => {
    var ccons = [];
    let beaconsLength = jsonpar.length;
    var beacons_distance_length = beaconDistance.length;
    for (var i = 0; i < beaconsLength; i++) {
      for (var j = 0; j < beacons_distance_length; j++) {
        if (
          jsonpar[i].id === beaconDistance[j].id ||
          jsonpar[i].name === beaconDistance[j].name
        ) {
          let cir = ` <circle cx="${jsonpar[i].pos.X}" cy="${
            jsonpar[i].pos.Y
          }" r="${
            beaconDistance[j].d * 400
          }" stroke="black" stroke-width="3" stroke-linecap="round" stroke-dasharray="5,10,5" />`;
          ccons.push(cir);
        }
      }
    }
    return `${ccons.join('')}`;
  };

  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="750"
    height="750"
    viewBox="0 0 1150 1150"
    content='&lt;mxfile host="app.diagrams.net" modified="2022-01-18T22:07:46.157Z" agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36" etag="pYmDNuH1GlqyVpQsC_ho" version="16.3.0" type="device"&gt;&lt;diagram id="iZ5W-7VZaEJZxDJXd183" name="Page-1"&gt;5VvbcpswEP0aP6YDCGH7sUl6mXY67TSdafKoGNUwxcgRcm336ytA3ASxZVcgEj8FbYSAc1aro9V6Am5Wuw8UrYMvxMfRxLH83QTcThzHdqYz/ie17HMLnM5zw5KGvuhUGe7Cv1gYLWHdhD5OGh0ZIREL103jgsQxXrCGDVFKts1uv0jUfOoaLXHLcLdAUdv6M/RZkFtn0KrsH3G4DIon25b4zwoVnYUhCZBPtjUTeDcBN5QQll+tdjc4SsErcMnve//Mf8sXozhmKjfcL54+fb6+2jz4s6fHmft3/wNeXYlR/qBoIz5YvCzbFwjg2H+bAslbMYm58Tpgq4i3bH5JySb2cfoEi7fye7HfgrR6R7v8cu4ymKwwo3veZVthW0Ab1GAtbBRHiIV/msMjQfGyHK58wjcS8gc7lnDHmRhG+KJbcFWMkJANXWBxUx3KY+M0h2GILjFrDcMvat9cmTKeTuDMuWzOzqPM9oxyBrRylvC3ZVJnvAvZveidXj+Ivun17a7e2J/IPH/LDOQDnweNuohj6fGRqWPUR9zLntfaSBuWNXhRrMloA+dlzjXvslnzXuhkmx6nrcnMNggZvlujbPXa8i1Kk0YxHKYM706lTtzgTZuQFM0jzNoyBXUWG7CditHsolzbldaRsxd/eaCBA9L8olk7e/Vv0T8blrYiTXGIt2QbriKUEZYJd5HksPTEH3cOGwjYNmwFINDBJOgr/tgK+9N+IfHgM8udMUgURGK/kMD5yCBxFBTYSUu5H1K8YCGJeZtHj/SjtADnNKfXvI2b24GbHIb04aYggXp2JTAyVwIKScwxuBKQVbhl2JeAQqQeBXDe2IBTSOedDdwWJ6wfh3M6ZuqsAzdZ+urDTSHF1W/wAlKqEDhtteQMGryMSwN3dJAoSIMDkNTnEkbZXKKEIWGZ63IkSWOWcJhCrZi0F7KDLINUse2Rg73qDlIeaOik/2WdwMpL0tm0yRv/1kB986agnV4Rb/qmm2neFKRbz+vtMycfNSK9A0TqXzhUTrCiKFwn+LiQRck6r8L5Fe5S51YD7ABTB5RcA0VF0SIfV2lDEaqcKI0PxWZywzCGrorwC9A6vVxTssBJchzLR7T4vcyC7dcNi8J0Vus6+gHg6EyeDzmToYKW6De2PVeto7hI6UdE7yrNUaD7+3rjod6oymyy1ul1Nvnad5RhYyLgddTZQL3FWEXhVXGducSbKTxYe1V6kt3wJHGbFmdSLNoavddByeucc4sXoLxltwf2O5UCr34lwpHoLQEE29F7WE1lPDcmZ3nsDkjsQQ87oEJ5RxWf7EFKYOT8fAdIXen5/vxGoZhiDOcatpyfd9QEZH+1Q55xBWmPLRvtKUjIYSEpRbYxSIznUFqQaMi+i4d95zMdxUv+HSc9rUsAyboWRQzTGDF8nQafpMWDjrpW4ydspaoay8GIZ1xFtCAxPoH/74StB0iAcS9RKS0OyOpxo5Bz0gCQVK/VIakGlZ2eSlWxyb2LK9f8ddRhD4vYCxGhUsauo76tC7YzSmt4s/qxa77eVT8ZBu/+AQ==&lt;/diagram&gt;&lt;/mxfile&gt;'
    style="background-color: rgb(255, 255, 255)"
    >
    <g class="currentLayer" style="">
      <!-- 1 m = 100 px-->
      <path
        d="M 50 50 L 1108 50"
        fill="#ffffff"
        stroke="rgb(0, 0, 0)"
        stroke-width="5"
        stroke-miterlimit="10"
        id="svg_1"
        fill-opacity="1"
      />
      <path
        d="M 1108 50 L 1108 955"
        fill="#ffffff"
        stroke-width="5"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        id="svg_2"
        fill-opacity="1"
      />
      <path
        d="M 1108 955 L 391 955"
        fill="#ffffff"
        stroke-width="5"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        id="svg_3"
        fill-opacity="1"
      />
      <path
        d="M 391 955 L 391 987"
        fill="#ffffff"
        stroke-width="5"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        id="svg_4"
        fill-opacity="1"
      />
      <!-- L triba biti 73, al stavljeno 50 da bude pravokutnik -->
      <path
        d="M 207 987 L 50 987"
        fill="#ffffff"
        stroke-width="5"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        id="svg_5"
        fill-opacity="1"
      />
      <path
        d="M 50 733 L 50 50"
        fill="#ffffff"
        stroke-width="5"
        stroke="rgb(0, 0, 0)"
        stroke-miterlimit="10"
        id="svg_6"
        fill-opacity="1"
      />
      <path
        d="M 50 733 L 50 624"
        fill="#ffffff"
        stroke="rgb(0, 0, 0)"
        stroke-width="20"
        stroke-miterlimit="10"
        id="svg_7"
        fill-opacity="1"
      />
      <path
        d="M 536 955 L 436 955"
        fill="#ffffff"
        stroke="rgb(0, 0, 0)"
        stroke-width="20"
        stroke-miterlimit="10"
        id="svg_8"
        fill-opacity="1"
      />
      <path
        d="M 1108 955 L 1108 773"
        fill="#ffffff"
        stroke="rgb(0, 0, 0)"
        stroke-width="20"
        stroke-miterlimit="10"
        id="svg_9"
        fill-opacity="1"
      />
      <rect
        x="1030"
        y="613"
        width="78"
        height="160"
        fill="black"
        stroke="rgb(0, 0, 0)"
        id="svg_10"
        fill-opacity="1"
      />
      <rect
        x="1070"
        y="50"
        width="38"
        height="24"
        fill="black"
        stroke="rgb(0, 0, 0)"
        id="svg_11"
        fill-opacity="1"
      />
      <rect
        x="501"
        y="50"
        width="480"
        height="63"
        fill="yellow"
        stroke="rgb(0, 0, 0)"
        id="svg_12"
        fill-opacity="1"
      />
      <rect
        x="369"
        y="50"
        width="46"
        height="26"
        fill="black"
        stroke="rgb(0, 0, 0)"
        id="svg_13"
        fill-opacity="1"
      />
      <rect
        x="391"
        y="727"
        width="44"
        height="44"
        fill="black"
        stroke="rgb(0, 0, 0)"
        id="svg_14"
        fill-opacity="1"
      />
      <path
        d="M 140 190 L 140 475"
        fill="#ffffff"
        stroke="yellow"
        stroke-width="5"
        stroke-miterlimit="10"
        id="svg_15"
        fill-opacity="1"
      />
      <path
        d="M 140 475 L 340 333"
        fill="#ffffff"
        stroke="yellow"
        stroke-width="5"
        stroke-miterlimit="10"
        id="svg_16"
        fill-opacity="1"
      />
      <path
        d="M 340 333 L 140 190"
        stroke="yellow"
        stroke-width="5"
        stroke-miterlimit="10"
        id="svg_17"
        fill-opacity="1"
      />
      <rect
        x="55"
        y="232"
        width="45"
        height="200"
        fill="yellow"
        stroke="rgb(0, 0, 0)"
        id="svg_18"
        fill-opacity="1"
      />
      <rect
        x="160"
        y="475"
        width="200"
        height="45"
        fill="yellow"
        stroke="rgb(0, 0, 0)"
        id="svg_19"
        fill-opacity="1"
      />
      <rect
        x="160"
        y="150"
        width="200"
        height="45"
        fill="yellow"
        stroke="rgb(0, 0, 0)"
        id="svg_20"
        fill-opacity="1"
      />
    </g>
    ${drawUser(userX, userY)}
    ${drawBeacons(jsonpar)}
    ${drawCircle(jsonpar, beaconDistance)}
    </svg>
    `;
};
