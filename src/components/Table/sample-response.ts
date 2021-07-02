const twoMinutesInMiliseconds = 2 * 60 * 1000
const TimeStamp = Number((Date.now() - twoMinutesInMiliseconds) / 1000).toFixed(0)
export const SampleResponse: any = {
  data: {
    transactions: [
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.5',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '7224.139537130400137485',
            amountUSD: '993.4497706470029167837876603413372',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x7979e6a762ae1294442bcfc8e9b0807602f08cbb',
            transaction: {
              __typename: 'Transaction',
              id: '0xf423d4c05540b509e8a01ef8b129786a435e32985a04f81b5a6981b9982bf9c4',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '30',
            amount1In: '2.271606998056478295',
            amount1Out: '0',
            amountUSD: '4506.859943792111474319978714196735',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x990f341946a3fdb507ae7e52d17851b87168017c',
                symbol: 'STRONG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xc263ec1cc6fb523ae96a92a426b5966dfe3b30fc',
            transaction: {
              __typename: 'Transaction',
              id: '0xdbc8a2e43216c17df2e28c916b723827b93249e334da47f241c84d00037d5e86',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '4524.82862',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '2.271606998056478295',
            amountUSD: '4513.541997836461472255829120402484',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                symbol: 'USDC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xc0bf97bffa94a50502265c579a3b7086d081664b',
            transaction: {
              __typename: 'Transaction',
              id: '0xdbc8a2e43216c17df2e28c916b723827b93249e334da47f241c84d00037d5e86',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '128.287456163417551789',
            amount1In: '9.543223329598349312',
            amount1Out: '0',
            amountUSD: '18932.99938220269002311916955620703',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x990f341946a3fdb507ae7e52d17851b87168017c',
                symbol: 'STRONG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x36c1c59dcca0fd4a8c28551f7b2fe6421d53ce32',
            transaction: {
              __typename: 'Transaction',
              id: '0xd87b1a971c3794d660148240e0eca314c89798114d522d300595811a402789ad',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1.5272100871945113',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '48210.231125709640618439',
            amountUSD: '3029.979205743348745296040396260801',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
                symbol: 'AMP',
              },
            },
            to: '0xd60b3f7fff21b47f53c412f3c20ea55dd851419c',
            transaction: {
              __typename: 'Transaction',
              id: '0xd40857d988d9d4380c90661e535dbaaa60df3980f3fde82b9348a70b4503f55d',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.25',
            amount0Out: '0',
            amount1In: '23573181873.725718020643470138',
            amount1Out: '8759828732348.716486533681424611',
            amountUSD: '503.9908593237102325720209575013479',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xefc60ceb7de7ccc5418f2822ed063e268e2f5d91',
                symbol: 'EverCrown👑',
              },
            },
            to: '0x6d988fef69840388ed44896b661e1f628c729138',
            transaction: {
              __typename: 'Transaction',
              id: '0xcf0f8056c292a3bcaa4dd1c27f79be003f6a49437d9fbbc37dbfedb8ec3953fe',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.285768397262915477',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '564.8004',
            amountUSD: '566.1119934951556062458107125358185',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xcf60c0a1a4da67c7b378d4089ef4428cfadadc0e',
            transaction: {
              __typename: 'Transaction',
              id: '0xa5ed1ae6d36818269e2ed0af4317c4eaac90cea7aff30d0c06dfaf5a249a3316',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.285768397262915477',
            amount1In: '4143.194',
            amount1Out: '0',
            amountUSD: '566.8532622306434527531939878945478',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            transaction: {
              __typename: 'Transaction',
              id: '0xa5ed1ae6d36818269e2ed0af4317c4eaac90cea7aff30d0c06dfaf5a249a3316',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '481.58264131',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.933369716201604153',
            amountUSD: '1851.802090016731893675313694658203',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x1796ae0b0fa4862485106a0de9b654efe301d0b2',
                symbol: 'PMON',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
            transaction: {
              __typename: 'Transaction',
              id: '0x9442abdaf08553bc655cf05c3a6b96a012569ac2b668ded44f96f928228530e8',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [
          {
            __typename: 'Burn',
            amount0: '37.95735285965508048',
            amount1: '0.312514884259133363',
            amountUSD: '1240.056765903041003790562153976834',
            liquidity: '3.026467556567190429',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x739763a258640919981f9ba610ae65492455be53',
                symbol: 'NDR',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            sender: '0x2c2add1c863551a0644876be227604c8e458dd7e',
            transaction: {
              __typename: 'Transaction',
              id: '0x890618d65c30ba6470870637e71125bed3341b529d7f185420d5a2fc72ea5ba8',
              timestamp: TimeStamp,
            },
          },
        ],
        mints: [],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '4.413940790072998803',
            amount1In: '887.828585',
            amount1Out: '0',
            amountUSD: '988.1911978316775912432438293408232',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x43789e8aeef0d30cffb57fc0870a5c785b7b93a1',
                symbol: 'PETRON',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x000000c52b33fa71614810224771dc8f3255b220',
            transaction: {
              __typename: 'Transaction',
              id: '0x87e5bdcea3c02dcdd5545751ae4d75c73d27d34eebd980954785459918095e8b',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '4600',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.475633087078965418',
            amountUSD: '943.6542984470408645317191761247953',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x6fc13eace26590b80cccab1ba5d51890577d83b2',
                symbol: 'UMB',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x6614e87d231db13cd269a327e42a50fce66afe9f7f6bcfcc191c3aa978c7a851',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '72902193464.990284548',
            amount0Out: '39220730684322.027309988',
            amount1In: '0.13',
            amount1Out: '0',
            amountUSD: '257.9195226965961463253423558072476',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc0114f14638a333a4d5c3b04f09b96372348a842',
                symbol: 'KEI',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xd437223b526dd358cdfa966c7f0ae9df52629a4d',
            transaction: {
              __typename: 'Transaction',
              id: '0x6214759215eb536375505b5d4142ab4056e0d78b17c03f61bf3971c92b14527e',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.4',
            amount0Out: '0',
            amount1In: '33108194638.664137971912263899',
            amount1Out: '12921951953378.59893186222552049',
            amountUSD: '813.42994357064268354094903491353',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xefc60ceb7de7ccc5418f2822ed063e268e2f5d91',
                symbol: 'EverCrown👑',
              },
            },
            to: '0x1fb4509f9a8beb3b60f6d5c997092d5982fc5e28',
            transaction: {
              __typename: 'Transaction',
              id: '0x5445637fd5b0e30887f66e4aaea3bb4eb8d2686128909d2eda3b907edffd10ff',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '128.287456163417551789',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '9.550786397674221034',
            amountUSD: '18948.72514665598461390759100205909',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x990f341946a3fdb507ae7e52d17851b87168017c',
                symbol: 'STRONG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x36c1c59dcca0fd4a8c28551f7b2fe6421d53ce32',
            transaction: {
              __typename: 'Transaction',
              id: '0x3e0288fadcecef4be6e39d767a887c72805862a0ebdd7965b831bc50d2d6090e',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '44153954.475814944803299429',
            amount1In: '0.07',
            amount1Out: '0',
            amountUSD: '138.879742990474848021338191588518',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x2b5ca2f9510cf1e3595ff219f24d75d4244585ea',
                symbol: 'EPAY',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x91e215f939d5c0d5ef9900ba1f5ea51e70ebb33a',
            transaction: {
              __typename: 'Transaction',
              id: '0x1e4bd2506feb94ac85aeca69954454ea90cab2e00eb9775b40799af52291db80',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.412095091810935442',
            amount1In: '104',
            amount1Out: '0',
            amountUSD: '105.0530224089829378861037217553999',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x43789e8aeef0d30cffb57fc0870a5c785b7b93a1',
                symbol: 'PETRON',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xa070fe1519597bf5c3d9444d42004f951b99ec10',
            transaction: {
              __typename: 'Transaction',
              id: '0x0a2ac0a6a2f22c1dd24dad7d46b739621983e92138f69f26380d02a73c1ce367',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '4.413940790072998802',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '918.606865',
            amountUSD: '833.7921175075559702409093498707958',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x43789e8aeef0d30cffb57fc0870a5c785b7b93a1',
                symbol: 'PETRON',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x000000c52b33fa71614810224771dc8f3255b220',
            transaction: {
              __typename: 'Transaction',
              id: '0x033015f66576ac55c015cd477aade48925eacc1467f96cbf385d30219b08d627',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.739679272311751684',
            amount1In: '1470.719264',
            amount1Out: '0',
            amountUSD: '1469.661513216362708107199492554669',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0xfe183cd36b8b627b43e1b35faa8d40e2a5cc4633a2493a3595584a12cc4be9a3',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '5883.768251642701108212',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '1470.719264',
            amountUSD: '1471.885272334983678334361033461605',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x21381e026ad6d8266244f2a583b35f9e4413fa2a',
                symbol: 'FORM',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            transaction: {
              __typename: 'Transaction',
              id: '0xfe183cd36b8b627b43e1b35faa8d40e2a5cc4633a2493a3595584a12cc4be9a3',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '94.242819941337054072',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.056191068778135862',
            amountUSD: '111.4786308271935419703531955105721',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
                symbol: 'MATIC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x4184d9a175d13e568f3466ea93c02b6f8eb9f8c1',
            transaction: {
              __typename: 'Transaction',
              id: '0xfda58415f6fbefaa20d7774545827c24dab1cb0edde7989d28188a7fcf556e41',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [
          {
            __typename: 'Mint',
            amount0: '0.757004980771310557',
            amount1: '8525.925061183',
            amountUSD: '3003.675873080496903768269181663341',
            liquidity: '0.002394448349209715',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xddaddd4f73abc3a6552de43aba325f506232fa8a',
                symbol: 'MFUND',
              },
            },
            to: '0xa4cfcfe12f435542374e7d09254b82730cfde383',
            transaction: {
              __typename: 'Transaction',
              id: '0xfa64617ec3b1eb9e6cbd1697c11482dd7a943ae96318a525122c7f4b0c2f3a45',
              timestamp: TimeStamp,
            },
          },
        ],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1201.153830381477398266',
            amount1In: '8.868923440464186439',
            amount1Out: '0',
            amountUSD: '17590.88915145123833751344435073391',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x0000000000d41c96294ccdac8612bdfe29c641af',
            transaction: {
              __typename: 'Transaction',
              id: '0xee64694c7f1dcdb2e9cc767d3c7e6ed75d4d3c73502883a165fdfa95c2512490',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '2.55204776620804217',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '5044.079208',
            amountUSD: '5055.538106249060922068808182348915',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x47294092daeafc531860a357346502fc3bc70f58',
            transaction: {
              __typename: 'Transaction',
              id: '0xe905660df7aa03c30f9c7a930aa2374f9ab28a0d03b4e1abf9cc38d065022089',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '2.55204776620804217',
            amount1In: '36212.741000000002064384',
            amount1Out: '0',
            amountUSD: '4995.838801766530654010444347985726',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            transaction: {
              __typename: 'Transaction',
              id: '0xe905660df7aa03c30f9c7a930aa2374f9ab28a0d03b4e1abf9cc38d065022089',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '5660.951518944770236074',
            amount1In: '0.451839996713517107',
            amount1Out: '0',
            amountUSD: '905.9578489953207471660058387759547',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3bfce6d6f0d3d3f1326d86abdbe2845b4740dc2e',
                symbol: 'MATPAD',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xabc514463fcdb35f0f83b8bc8a84c6a542538f4f',
            transaction: {
              __typename: 'Transaction',
              id: '0xd083c2ae8de9df3479443e74c548098db77a9c8af995b5183af2848d6e66226c',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1.34064908669107247',
            amount1In: '20',
            amount1Out: '0',
            amountUSD: '2659.708690134781718766318839289605',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xee06a81a695750e71a662b51066f2c74cf4478a0',
                symbol: '$DG',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x9df5cf79989ff734571445b298dbc663ad92053c00205a2730d3373b42661a6b',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1.363871579102030393',
            amount1In: '15498.876654883',
            amount1Out: '0',
            amountUSD: '2705.813211397342458029976544219488',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xddaddd4f73abc3a6552de43aba325f506232fa8a',
                symbol: 'MFUND',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x88ea42446fb208b547c6375880de3229684331c48fa708e61110a2fe19242954',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.1',
            amount0Out: '0',
            amount1In: '912251873.562988391',
            amount1Out: '57586283064.554307564',
            amountUSD: '198.3920812529023480624022120329843',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xe2a083397521968eb05585932750634bed4b7d56',
                symbol: 'HODL 💎',
              },
            },
            to: '0xf94466648b58ddf9f3129da2902a6e203f6f15ba',
            transaction: {
              __typename: 'Transaction',
              id: '0x88bfc4b53f9904b9fc2b2dc71066f9fc43f022c179ffb3cdada80f584e1dd121',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '74966682.391910682',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.156591150690662634',
            amountUSD: '310.6644429130741692366339000235236',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x75d12e4f91df721fafcae4c6cd1d5280381370ac',
                symbol: 'MYOBU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x4e1dffd2e3cdb615c6275895c4b7f31560f361c48fdc536e9cdf799915e212ee',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '3761646.854050909',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.007876520998304234',
            amountUSD: '15.62639393885765109404911130359866',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x75d12e4f91df721fafcae4c6cd1d5280381370ac',
                symbol: 'MYOBU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x4e1dffd2e3cdb615c6275895c4b7f31560f361c48fdc536e9cdf799915e212ee',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1.051734437204179702',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '2078.891551',
            amountUSD: '2083.513815971905956793672912129638',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xc273c5a595143970df3ace227e8107eb18ee7562',
            transaction: {
              __typename: 'Transaction',
              id: '0x4bd7195796b112e2e76ab2835b3dc8f629892a97aa2c5181b6737a59f1efdcf7',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '137.46',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '1.051734437204179702',
            amountUSD: '2086.657513869240165740328722778895',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            transaction: {
              __typename: 'Transaction',
              id: '0x4bd7195796b112e2e76ab2835b3dc8f629892a97aa2c5181b6737a59f1efdcf7',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '3.0045836401551872',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '28610.093303362184969797',
            amountUSD: '6053.062042286386278175984951892338',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xfc0d6cf33e38bce7ca7d89c0e292274031b7157a',
                symbol: 'NTVRK',
              },
            },
            to: '0x61c86828fd30ca479c51413abc03f0f8dcec2120',
            transaction: {
              __typename: 'Transaction',
              id: '0x2fe39f79f1f7395f92f0e7d25d3d901def4e0ff6731b4bc6ab705c19a22db711',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1201.153830381477398266',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '9.216399504972588118',
            amountUSD: '18280.08361508389531772677360231028',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x0000000000d41c96294ccdac8612bdfe29c641af',
            transaction: {
              __typename: 'Transaction',
              id: '0x206fdb69f1c757216b8df17d6ab156714f6601cfbdfbdf400f20bb693c708fe5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.5',
            amount0Out: '0',
            amount1In: '53762830606.390079216946630098',
            amount1Out: '19350161522538.854518455371900291',
            amountUSD: '1026.388705958265516170547522327474',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xefc60ceb7de7ccc5418f2822ed063e268e2f5d91',
                symbol: 'EverCrown👑',
              },
            },
            to: '0x32a9c727b248b9081c95f5120ff1c990cec5e9b5',
            transaction: {
              __typename: 'Transaction',
              id: '0x1423be6bd8f8a9e76895de63be8e913f20112b07817eabf8534262e3471d1401',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '35082.783253',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '17.61939052250657687',
            amountUSD: '35003.81026119196065224795867565196',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                symbol: 'USDC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x0258b346adcd708ad043f739d1401f5e07f006bef0298ee848243155c46a0053',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '10570.301966667224470555',
            amount1In: '80',
            amount1Out: '0',
            amountUSD: '158674.4029941073164698318711433973',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xc0a11c8a825f219ad4d465ad48c4bff7f75fc490',
            transaction: {
              __typename: 'Transaction',
              id: '0x001a3507cd5b0f4706f9d54a51da4ff265b68763950b9d631646c558a5ae6632',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '45291.322536691',
            amount0Out: '17498792.834511678',
            amount1In: '59.300285',
            amount1Out: '0',
            amountUSD: '59.32927352246270761107936749790253',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x35a23bc27c345b36dee700a256f69c6334030971',
                symbol: 'CHY',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x6b7d4cfa156ac2d5b403c9ea19f9fe7be5804eaa',
            transaction: {
              __typename: 'Transaction',
              id: '0xfe2ae860b519c1b9b491bfc0933a30d63451de319a5f803f60b4c32919cdd64a',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0.03',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '59.300285',
            amountUSD: '59.41366508076155217577182520161025',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xa78ccdd0ede4079d0d8a6747555d7baf7c33931b',
            transaction: {
              __typename: 'Transaction',
              id: '0xfe2ae860b519c1b9b491bfc0933a30d63451de319a5f803f60b4c32919cdd64a',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '456098945.839613052950198942',
            amount1In: '1.581487366067601177',
            amount1Out: '0',
            amountUSD: '3136.769545668748373092210037688686',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
                symbol: 'SHIB',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x23420a9b40641c2fc32eb9e45fbc8b29765ea70e',
            transaction: {
              __typename: 'Transaction',
              id: '0xef0b3e3383d70349fc42a4303c3629449fa15bdf817edce396b0d102a2307451',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '5605713.015592684',
            amount0Out: '37082274545.712709998',
            amount1In: '0.033414821910357362',
            amount1Out: '0',
            amountUSD: '66.27596147225463701587777550908725',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa2b4c0af19cc16a6cfacce81f192b024d625817d',
                symbol: 'KISHU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x36cbb5971ecc156edc40512ea73e0cae2260cddd',
            transaction: {
              __typename: 'Transaction',
              id: '0xe5509f88be5231924e5e62b70340a5cc65f1b3d826a5f0a431f61f84855bb03a',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.00117187',
            amount1In: '0.02',
            amount1Out: '0',
            amountUSD: '39.66860074852682911745796778584932',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x9be89d2a4cd102d8fecc6bf9da793be995c22541',
                symbol: 'BBTC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xb923e83e258638a78f6403c3e89a615215a0bf55',
            transaction: {
              __typename: 'Transaction',
              id: '0xd580f5d156e49ccb9abb6988314cbdb52db5e615859fe68098323c5cd5f494b6',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '3626364595275.335691848490420296',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.115549825494771092',
            amountUSD: '229.1849947057010511393904628126301',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x73cd0f2fc19de23de7b6709c64b2fa64a70eaafc',
                symbol: 'SHIITAKE🍄',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0xbb42830e64da0c8e7c42abebdf955a8c88c90be56d14b5a8ea0a6fc85b2a359c',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [
          {
            __typename: 'Mint',
            amount0: '10516.161735667751839545',
            amount1: '1.530502276060310042',
            amountUSD: '6071.300106867294819719474248682581',
            liquidity: '89.256888883776166598',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec',
                symbol: 'KEEP',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x0abf38a836553552d2f064c1255b328a5ebbd5e4',
            transaction: {
              __typename: 'Transaction',
              id: '0xad179042a45d0b9332a716d31d42d89989d4a183e8cd272638912c78b615e81e',
              timestamp: TimeStamp,
            },
          },
        ],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '42966.779683152703028611',
            amount1In: '0.099125',
            amount1Out: '0',
            amountUSD: '196.6078824274501567821663109765797',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x55296f69f40ea6d20e478533c15a6b08b654e758',
                symbol: 'XYO',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x74de5d4fcbf63e00296fd95d33236b9794016631',
            transaction: {
              __typename: 'Transaction',
              id: '0xa5f58adf1c1c9fbaf6a3f761564fe4b8b551b7d4bbbef8857ed94349aeec6afa',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1169160.707444779295624485',
            amount1In: '0.0040494',
            amount1Out: '0',
            amountUSD: '8.031701593554227091411714737600912',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
                symbol: 'SHIB',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xf4d10478e8c627deb3a3fe855e83b2cac1637d92',
            transaction: {
              __typename: 'Transaction',
              id: '0x9db7295ff9e6577e1b7fe1ec48f6861f8aa4df8704f622f81f772f8c9e5dd709',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '129873.147904155',
            amount0Out: '50148744.20969033',
            amount1In: '169.562974',
            amount1Out: '0',
            amountUSD: '169.7380160734796657762133268037488',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x35a23bc27c345b36dee700a256f69c6334030971',
                symbol: 'CHY',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x43729981f9f8a48ba55ef3e03707135f3b719450',
            transaction: {
              __typename: 'Transaction',
              id: '0x98d061376b17df9ce5b80896630f35985a8b0224b094ae214ea24e41362dbcde',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0.085781660216777772',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '169.562974',
            amountUSD: '169.8869453153741769399808288254989',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xa78ccdd0ede4079d0d8a6747555d7baf7c33931b',
            transaction: {
              __typename: 'Transaction',
              id: '0x98d061376b17df9ce5b80896630f35985a8b0224b094ae214ea24e41362dbcde',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '6921121101518.070949004488910074',
            amount1In: '0.497222784',
            amount1Out: '0',
            amountUSD: '992.2425814545743285068404599097265',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x893bd178b673c97136bf5ad69ae0466de34ec576',
                symbol: 'TopONE 🔝',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7f7082b2ffe876c2b53aea29a2b073f18a1af5f8',
            transaction: {
              __typename: 'Transaction',
              id: '0x7a09c5763cfa663e9ee77bf28c64409f20b0da60957c439e2548d8028e402f59',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1567853.088125158',
            amount0Out: '604398750.458160658',
            amount1In: '2000',
            amount1Out: '0',
            amountUSD: '2020.488309148064300032069649607315',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x35a23bc27c345b36dee700a256f69c6334030971',
                symbol: 'CHY',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xd3ab41f78682466897f40deae598bcb3b8be6a46',
            transaction: {
              __typename: 'Transaction',
              id: '0x5e407e7c74ebeadfea858e138628ac5bae80266b7045d9777245942b00b7be03',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '7791.131608690426118144',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.036216726798031501',
            amountUSD: '71.83348261502608553691128565575878',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x41ab1b6fcbb2fa9dced81acbdec13ea6315f2bf2',
                symbol: 'XDCE',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x0000000000007f150bd6f54c40a34d7c3d5e9f56',
            transaction: {
              __typename: 'Transaction',
              id: '0x33240fbe31334d7d521a27efec9dae235dcc4d004fa15509ad751c4b8ea8bece',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '10000',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '1.086535010100632032',
            amountUSD: '2155.070340672619733565740654469701',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x10633216e7e8281e33c86f02bf8e565a635d9770',
                symbol: 'DVI',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x22431c90bb02b3b0bd13cd124f3d15e7639b44ceb4c8e21c72496830f56dfc06',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.979893524128984557',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '8092.124612323006884276',
            amountUSD: '1943.472229027780206978993921968498',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xf65b5c5104c4fafd4b709d9d60a185eae063276c',
                symbol: 'TRU',
              },
            },
            to: '0xe16ae43d864092d3504864268b5d9f78332927a4',
            transaction: {
              __typename: 'Transaction',
              id: '0xe876b98d3ebd001453ab02d51feef9d3087abdf2536c0e35c396c19abb4e5fa0',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '1950.229004',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.979893524128984557',
            amountUSD: '1946.377879615451924330482424085076',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                symbol: 'USDC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x80b4d4e9d88d9f78198c56c5a27f3bacb9a685c5',
            transaction: {
              __typename: 'Transaction',
              id: '0xe876b98d3ebd001453ab02d51feef9d3087abdf2536c0e35c396c19abb4e5fa0',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [
          {
            __typename: 'Mint',
            amount0: '774587.161665517378262287',
            amount1: '0.157728284675851587',
            amountUSD: '625.6872443688921488433778799509178',
            liquidity: '243.163435647616782762',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1',
                symbol: 'BAO',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x14f81d1cad166a64974d1f436044069cb280edab',
            transaction: {
              __typename: 'Transaction',
              id: '0xe6264ac6f07ec2a59e371918f11448ce8d743105e2d6549ce8128d972bc2be5a',
              timestamp: TimeStamp,
            },
          },
        ],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1.922228703535125552',
            amount1In: '25897.297209959476687542',
            amount1Out: '0',
            amountUSD: '3776.35763019735392780079496745144',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x0000000000d41c96294ccdac8612bdfe29c641af',
            transaction: {
              __typename: 'Transaction',
              id: '0xddeae6ca0f0945c63695a56c13d03e96ca7698897ebb9cf2ae288b6a1669c065',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '342.121054194366448958',
            amount1In: '2.514466514303185205',
            amount1Out: '0',
            amountUSD: '4986.986359193732378751682379424242',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x5badda5ed2139fbbf37999f1e95225f61d0ee26f',
            transaction: {
              __typename: 'Transaction',
              id: '0xdb1a8264cfe4adaff11f5de4a4ddd3d04a9b7eeeb5bf26124b7557ea3351039a',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '2.514466514303185205',
            amount1In: '5000',
            amount1Out: '0',
            amountUSD: '4994.357521660898996284817619237341',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x94ae6d2390680ac6e6ee6069be42067d6ad72e2a',
            transaction: {
              __typename: 'Transaction',
              id: '0xdb1a8264cfe4adaff11f5de4a4ddd3d04a9b7eeeb5bf26124b7557ea3351039a',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '8916.345214591655078522',
            amount1In: '0.04',
            amount1Out: '0',
            amountUSD: '79.33271460687139212734669877819048',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x41ab1b6fcbb2fa9dced81acbdec13ea6315f2bf2',
                symbol: 'XDCE',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xecf8098b9660ecd157aae476b3f28b8e3bbf313e',
            transaction: {
              __typename: 'Transaction',
              id: '0xb61313a615d1a3b9c659d2794e0a608f1f4c16ba2be12e66c474ecfb7e657abe',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1.882162067434081111',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '25897.297209959476687542',
            amountUSD: '3768.130679627263302402879792572346',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x0000000000d41c96294ccdac8612bdfe29c641af',
            transaction: {
              __typename: 'Transaction',
              id: '0xa6f753d5d30a8febc38bcb6d10972db534a1c403fc017efc83ef108d70591086',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '100',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.730194644233964439',
            amountUSD: '1448.147119780737269614579732716288',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
            transaction: {
              __typename: 'Transaction',
              id: '0x9c0886d7cccb5074674fb98d53ad052e4f6eb7578abf30c7135ed2eeacb18146',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '341.312758449174059147',
            amount1In: '2.512084459962821315',
            amount1Out: '0',
            amountUSD: '4982.553403805245838565007719622582',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x4d95741ea5bcfe13f7a7666a798e39aa2bd4c8ea',
            transaction: {
              __typename: 'Transaction',
              id: '0x8ea58b2eebc2575d5cdec03abe1b1bc2f5a6af6ef16b3c80bfd431dcd9476192',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '5000',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '2.512084459962821315',
            amountUSD: '4989.929249138235800405273867472949',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                symbol: 'USDC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x94ae6d2390680ac6e6ee6069be42067d6ad72e2a',
            transaction: {
              __typename: 'Transaction',
              id: '0x8ea58b2eebc2575d5cdec03abe1b1bc2f5a6af6ef16b3c80bfd431dcd9476192',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '168640507470.14',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '6.957769992211835526',
            amountUSD: '13799.69601069288140710132563549026',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x15874d65e649880c2614e7a480cb7c9a55787ff6',
                symbol: 'eMax',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x81e16398fbabf09ddfb08e19f22352e2c50aefc14d0c8e76c03d481843d670b6',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '873.328751294321562051',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.025943937442670745',
            amountUSD: '51.45808426162654956094239443760055',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x84810bcf08744d5862b8181f12d17bfd57d3b078',
                symbol: 'SGT',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x541140385f9a42980eab7d9023fd895c2463b58760bf3030802f0e5574869f61',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1037483983.559327250811048934',
            amount1In: '0.0434266347',
            amount1Out: '0',
            amountUSD: '86.12882042479895139486852420228536',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x15874d65e649880c2614e7a480cb7c9a55787ff6',
                symbol: 'eMax',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x477b54308f985f50d9ec0caddb99a2041e478a7b',
            transaction: {
              __typename: 'Transaction',
              id: '0x51ee5796959e5c1396b083adcdef8ec134d4f22dca4e31d9f05a54e018579964',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '490167805262.965056018',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.439311756049671741',
            amountUSD: '871.294854153302874860217161777723',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa2b4c0af19cc16a6cfacce81f192b024d625817d',
                symbol: 'KISHU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x4b627847666984754ed8725cb5ce6181b7dd6df6dcb6d1d33cac043fb2518948',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '139',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '1.286724220301293715',
            amountUSD: '2555.669812682921483528752570429479',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x514910771af9ca656af840dff83e8264ecf986ca',
                symbol: 'LINK',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
            transaction: {
              __typename: 'Transaction',
              id: '0x49187f96903e1ad39830674d085bc94cbecab1fbd665ea80fed258b25eb18abd',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.001380212',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '18.894465090727653422',
            amountUSD: '2.733474624796127001442898086489835',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0xa20d0f2c4c00b99198c939990975b248ab5a7772',
            transaction: {
              __typename: 'Transaction',
              id: '0x47cd9080afdb5fedc61347a022d9c2de0cc12ca4681a45cd4701376e87170eaf',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1.474348433589212557',
            amount1In: '0.249269338077911567',
            amount1Out: '0',
            amountUSD: '2924.272620309742325032277395222013',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd075e95423c5c4ba1e122cae0f4cdfa19b82881b',
                symbol: 'wPE',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x447eea615e04e8437ee9640e89aed65be43787f88931a1beee44a176dba47fd7',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '1000000',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.249269338077911567',
            amountUSD: '1466.791970853848165008856518335433',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x965d79f1a1016b574a62986e13ca8ab04dfdd15c',
                symbol: 'M2',
              },
              token1: {
                __typename: 'Token',
                id: '0xd075e95423c5c4ba1e122cae0f4cdfa19b82881b',
                symbol: 'wPE',
              },
            },
            to: '0x75f89ffbe5c25161cbc7e97c988c9f391eaefaf9',
            transaction: {
              __typename: 'Transaction',
              id: '0x447eea615e04e8437ee9640e89aed65be43787f88931a1beee44a176dba47fd7',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.017149657153858845',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '141.336096836878366436',
            amountUSD: '34.015210868872224782785910393712',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xf65b5c5104c4fafd4b709d9d60a185eae063276c',
                symbol: 'TRU',
              },
            },
            to: '0x28ef1977e1feba5095c7e4a81302c23bb299e094',
            transaction: {
              __typename: 'Transaction',
              id: '0x42e779e62bb6c27571efa6d50b6f5c566b9c116098d4da01c61a3f305e0e056c',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '52235955.29183252',
            amount0Out: '4072545978.475304529',
            amount1In: '0.503221822547414449',
            amount1Out: '0',
            amountUSD: '1018.775943123389195544320466747865',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x97d5928291652d7f65e9031c66745ea974c97a42',
                symbol: 'COOKIE',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xc0cf3b3fa84e660b1a18fd3ecfe2b72cc94c8c5b',
            transaction: {
              __typename: 'Transaction',
              id: '0x3f45402e92a9a04d253920143e78bcc72554fea82c12dfb790fd6a0271a17c85',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '850086410.912904635001',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.503221822547414449',
            amountUSD: '998.0488308025927480048654130025155',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x72e5390edb7727e3d4e3436451dadaff675dbcc0',
                symbol: 'HANU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xa398d7f9f61bf50a69f16c0081625ac44b91f0f3',
            transaction: {
              __typename: 'Transaction',
              id: '0x3f45402e92a9a04d253920143e78bcc72554fea82c12dfb790fd6a0271a17c85',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '5978.40648575939752747',
            amount1In: '0.247159699325197998',
            amount1Out: '0',
            amountUSD: '490.2249190994447399163602039773865',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xb16e967ff83de3f1e9fceafbc2c28c1c5c56ef91',
                symbol: 'PDOG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xef9af587682d092d8d3c7341bfd7c10d9b7cfd65',
            transaction: {
              __typename: 'Transaction',
              id: '0x240d069a5552664306010c44688daee3a0be06908e76ce48d241660041f74460',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.247159699325197998',
            amount1In: '85.236886457639391344',
            amount1Out: '0',
            amountUSD: '490.2249190994447399163602039773865',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xde30da39c46104798bb5aa3fe8b9e0e1f348163f',
                symbol: 'GTC',
              },
            },
            to: '0x669fbbd3612910ff1394f657900fbb8f335d044d',
            transaction: {
              __typename: 'Transaction',
              id: '0x240d069a5552664306010c44688daee3a0be06908e76ce48d241660041f74460',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '581648694.692258884565231824',
            amount1In: '0.003725828880259682',
            amount1Out: '0',
            amountUSD: '7.380847879200980785213801848022162',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xbf2d3b170118d76eb3d457e9839cbad6ba785b5b',
                symbol: 'EverSky',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x835cdb9de7ca5fa5b8c42682285889f2bb6cbc75',
            transaction: {
              __typename: 'Transaction',
              id: '0x23d8f1e629bd682fa3993fc276bdace34946c0b4c38696a70cd2ac21f7d079e2',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '57644776204.306049817',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.003725828880259682',
            amountUSD: '7.399171779862097292879688644886331',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x57f55d89c30172a913bae10a2e702e5302f1e356',
                symbol: 'BBW',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xfa805f10f9ea2d16711ac25eb84dd92fc16cdcbf',
            transaction: {
              __typename: 'Transaction',
              id: '0x23d8f1e629bd682fa3993fc276bdace34946c0b4c38696a70cd2ac21f7d079e2',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1.2',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '15937.368626613092525343',
            amountUSD: '2392.603114463485400767276210365563',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xd85ad783cc94bd04196a13dc042a3054a9b52210',
                symbol: 'HAKA',
              },
            },
            to: '0x8765c2cad53c098545a39f541a1626b6b6f58851',
            transaction: {
              __typename: 'Transaction',
              id: '0x05c21e4ffc19d6a52cd7301241e750c4038c80553ec9b16245e808b625f169c2',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [
          {
            __typename: 'Mint',
            amount0: '1037.481792036459837931',
            amount1: '7.6',
            amountUSD: '30145.26314996021234028659495097894',
            liquidity: '70.556392046322506202',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x004cad75155af30b36b33358047604b8a9227f6c',
            transaction: {
              __typename: 'Transaction',
              id: '0xe1158e5d603c855338449aacad244a5c4ce4d65b35413eab45dfd7d91245c21d',
              timestamp: TimeStamp,
            },
          },
        ],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '18104690377.23794775',
            amount0Out: '8914619841392.342743267',
            amount1In: '0.1003771694',
            amount1Out: '0',
            amountUSD: '199.1935074726725901966437726892078',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x92a42db88ed0f02c71d439e55962ca7cab0168b5',
                symbol: 'TRDG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xe58ccc9853d875932371b3bb6d953430d0176833',
            transaction: {
              __typename: 'Transaction',
              id: '0xa2f02a328a3727f4f4d6353b3a9417fca3820eb48d76e636823c8e11d9a12269',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '3998.329249',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '7534257891.6657648294831592',
            amountUSD: '4091.385011103166028153923082452477',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
              token1: {
                __typename: 'Token',
                id: '0xe94032f3b8a661d4359fd0324ff4a7b37e2ba7a3',
                symbol: 'RATI',
              },
            },
            to: '0x66f049111958809841bbe4b81c034da2d953aa0c',
            transaction: {
              __typename: 'Transaction',
              id: '0x8c932eede48915fc9f6ad1465816ade68737b4c067fd6a28152ed5b4d99a34d5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '323726.701744191',
            amount0Out: '122343894.644559173',
            amount1In: '395.296939',
            amount1Out: '0',
            amountUSD: '396.1751617858533335025738010898951',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x35a23bc27c345b36dee700a256f69c6334030971',
                symbol: 'CHY',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xa84a7fc719d2ddeedbf91d46f81079464f26ac6f',
            transaction: {
              __typename: 'Transaction',
              id: '0x3a27d7ba613c052af3d0b06bbee5fef0fd924499ac5279b2a8ca9dae17d8194d',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0.2',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '395.296939',
            amountUSD: '396.0527310473620629371303175765757',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0xa78ccdd0ede4079d0d8a6747555d7baf7c33931b',
            transaction: {
              __typename: 'Transaction',
              id: '0x3a27d7ba613c052af3d0b06bbee5fef0fd924499ac5279b2a8ca9dae17d8194d',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '390.391158',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '698193766.125046098416891957',
            amountUSD: '390.8486709280695953566579063260663',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
              token1: {
                __typename: 'Token',
                id: '0xe94032f3b8a661d4359fd0324ff4a7b37e2ba7a3',
                symbol: 'RATI',
              },
            },
            to: '0xcfb896c65a006fbae006aafedbf10b6ae5a1bc3f',
            transaction: {
              __typename: 'Transaction',
              id: '0x362b026993706d134c45bdc60395bc049ce591b8e814a2fb33aa7e5143e11987',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '4010.839467',
            amount1In: '7534257891.665764829483159199',
            amount1Out: '0',
            amountUSD: '3924.607100524645313768335754776573',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
              token1: {
                __typename: 'Token',
                id: '0xe94032f3b8a661d4359fd0324ff4a7b37e2ba7a3',
                symbol: 'RATI',
              },
            },
            to: '0x66f049111958809841bbe4b81c034da2d953aa0c',
            transaction: {
              __typename: 'Transaction',
              id: '0x2528bfc7321f637f743a813d117197d5799f452a865574f9c2f158e80e9d8fcc',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '2180.699354778064133135',
            amount1In: '0.004',
            amount1Out: '0',
            amountUSD: '7.932963986831634826393451742117904',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x29cbd0510eec0327992cd6006e63f9fa8e7f33b7',
                symbol: 'TIDAL',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x1ab6dd0f83b33d137411056953b0a89b2dcba899',
            transaction: {
              __typename: 'Transaction',
              id: '0xfa4b0306111e34f2151fb64974b50c54a72e08bc939b6740e277e422ad0b0328',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.05',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '1.6373573628938597',
            amountUSD: '99.1620498353954353299181467764738',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xfa6de2697d59e88ed7fc4dfe5a33dac43565ea41',
                symbol: 'DEFI5',
              },
            },
            to: '0x633fffa2116fe2b406477c76977d1e2b682c1e3f',
            transaction: {
              __typename: 'Transaction',
              id: '0xdb38e2a2364676f0f9601e0cf255e94b37a9b2122227bbf104b37b8c8b218be5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '33519093.937655753',
            amount0Out: '221867003725.761359175',
            amount1In: '0.200117963216032835',
            amount1Out: '0',
            amountUSD: '396.8818163284981172864250938838849',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa2b4c0af19cc16a6cfacce81f192b024d625817d',
                symbol: 'KISHU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x177cf8bf251401c95559ff67dfbd63ce00a2a198',
            transaction: {
              __typename: 'Transaction',
              id: '0x9d63d8ebaaf10136ee24b9d2be958751e321f12bc29fe757386d9333a4ee4764',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '747603967.359318093786420627',
            amount1In: '0.03129011',
            amount1Out: '0',
            amountUSD: '62.05582894350010129942050207264021',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x15874d65e649880c2614e7a480cb7c9a55787ff6',
                symbol: 'eMax',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xbcc776e769702d04f8e98e98699a8643e98f77f6',
            transaction: {
              __typename: 'Transaction',
              id: '0x8ce8d0db17543f835ab3aee321845da866ed57c51e1ffac72d8f42518135d667',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.050042516351098669',
            amount1In: '99.504709',
            amount1Out: '0',
            amountUSD: '99.3956353012121637021916302004502',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x68703f47994f0c124bb5b0659f9481193e0773ed0d9a3a7ac42609198a01f771',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '2150241.523227352785668464',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '99.504709',
            amountUSD: '99.54502573558642589133356447152072',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x6599fc3e77cbfa6f6e9cac605a30b1e78827eba0',
                symbol: 'NFTs',
              },
              token1: {
                __typename: 'Token',
                id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                symbol: 'USDT',
              },
            },
            to: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
            transaction: {
              __typename: 'Transaction',
              id: '0x68703f47994f0c124bb5b0659f9481193e0773ed0d9a3a7ac42609198a01f771',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.052988392143372898',
            amount1In: '2837737603.990121471',
            amount1Out: '0',
            amountUSD: '104.9425793566996189504561606434268',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xc18c18055d01343fbcafd1a1c583cb39b79872e3',
                symbol: 'DOGUS',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x675fec93ee31002f73571cbc428a3a06944eb16ce576b1ee8c2411931cfec1b5',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.003122694527204299',
            amount1In: '166213717.136961573',
            amount1Out: '0',
            amountUSD: '6.201312047943788821278128085602168',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xc18c18055d01343fbcafd1a1c583cb39b79872e3',
                symbol: 'DOGUS',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0x675fec93ee31002f73571cbc428a3a06944eb16ce576b1ee8c2411931cfec1b5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.4',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '4644.993129679428996248',
            amountUSD: '793.29573407671214646818988994554',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c',
                symbol: 'NCR',
              },
            },
            to: '0xf87725a4592ebfce1c83a8145cfd38c285228e27',
            transaction: {
              __typename: 'Transaction',
              id: '0x4ff9492e938d086c5f1fad98378b204d422097edbfa69d81f6874af68cc01cb5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [
          {
            __typename: 'Burn',
            amount0: '6061.958854872589620823',
            amount1: '0.180920507175829259',
            amountUSD: '717.6173327479026993980111888741803',
            liquidity: '29.513100081680827716',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x84810bcf08744d5862b8181f12d17bfd57d3b078',
                symbol: 'SGT',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            sender: '0xccc452f390544948e13a32e7a32933f0b478b988',
            transaction: {
              __typename: 'Transaction',
              id: '0x0e395099a3189d525238c8e2a212fd97f75e1e61bb692655b3eef2869f29262a',
              timestamp: TimeStamp,
            },
          },
        ],
        mints: [],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1.004492228384923224',
            amount1In: '3468.014130892858055565',
            amount1Out: '0',
            amountUSD: '1992.148499227425146166872741042415',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
                symbol: 'GRT',
              },
            },
            to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
            transaction: {
              __typename: 'Transaction',
              id: '0xfacde94afcb657aae1f61a7c87727188336dec04d721226a20b8f7c8375206c4',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '1020.369552749672945288',
            amount1In: '0.08',
            amount1Out: '0',
            amountUSD: '158.659146815342429293637977989108',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x1735db6ab5baa19ea55d0adceed7bcdc008b3136',
                symbol: 'URQA',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x9155a74a0243dff3c8a502477681791dfb07a18c',
            transaction: {
              __typename: 'Transaction',
              id: '0xb89a3bbd84a91df799e092d0c51fc4f5c818314470ba7f33bb980e4e24c7da54',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '57955.113498432768462715',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '6.373048494559881454',
            amountUSD: '12639.2804594959159864186798528188',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x8b39b70e39aa811b69365398e0aace9bee238aeb',
                symbol: 'PKF',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x1d0d407c5af8c86f0a6494de86e56ae21e46a951',
            transaction: {
              __typename: 'Transaction',
              id: '0x8352d07616b27db5004b6f10d7c29d6acba7672a8c12347a81d53d3f1815ca36',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '21876014.942658995',
            amount0Out: '172515905992.839972017',
            amount1In: '0.5051715766',
            amount1Out: '0',
            amountUSD: '1001.876141733967550939264021129922',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x389999216860ab8e0175387a0c90e5c52522c945',
                symbol: 'FEG',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x9bd5e802f160e7ede158ff5236e622f5eb04fe5f',
            transaction: {
              __typename: 'Transaction',
              id: '0x5ff77bcad884f52838490a3c5adfcf3580b5efa86dba981087bbabc11b6c59aa',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '8189064757.361668900033368457',
            amount1In: '0.2',
            amount1Out: '0',
            amountUSD: '396.64786703835607323409494497277',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x939a7a577d93ad29b64c1595b1284ce660a479b9',
                symbol: 'JEJUDOGE',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x5144aca278867ab6c04455464d8f6a2607e3c075',
            transaction: {
              __typename: 'Transaction',
              id: '0x4f61a6ae0767abf3df515931e4ab2ffbbf1d787be75d7d2d0afacbd241fde33b',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '360386.878234121',
            amount0Out: '2384732559.03160036',
            amount1In: '0.002150314',
            amount1Out: '0',
            amountUSD: '4.264587307813578006301498187520885',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa2b4c0af19cc16a6cfacce81f192b024d625817d',
                symbol: 'KISHU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xbd0fe2c1d4da54c762ae276987a9b902f4c576b1',
            transaction: {
              __typename: 'Transaction',
              id: '0x4112cb53a0b0ddb01481709297c750a0a082b0a3a2fb663d1ff266c38dea65f5',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '3625.60687025',
            amount1In: '1.205163825',
            amount1Out: '0',
            amountUSD: '2390.12830309018313465390992148274',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
                symbol: 'STORJ',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xc47db7c4f16849dfc6941f1c9784aafeecbe4e97',
            transaction: {
              __typename: 'Transaction',
              id: '0x303c63e4a3d4ce06f98a4e04f521150ac23d9855cbec0d374d1f80938b51f8a6',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '7176107460691.873159362224777683',
            amount1In: '0.5',
            amount1Out: '0',
            amountUSD: '997.8476126124219572241286664864239',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x893bd178b673c97136bf5ad69ae0466de34ec576',
                symbol: 'TopONE 🔝',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x9750dbceb1bb0a189e7b97e4fd18e568fe2e0d3a',
            transaction: {
              __typename: 'Transaction',
              id: '0x209ac5f21247c8f748dd9c76612ba0e6e2a238ab89776ece98edb7ab437aba61',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '1.936144622110655488',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '61295.825662068185286364',
            amountUSD: '3839.838173189877211022597403739485',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xff20817765cb7f73d4bde2e66e067e58d11095c2',
                symbol: 'AMP',
              },
            },
            to: '0x97b93bcfe80f3981f8a8925809a771405d7dee86',
            transaction: {
              __typename: 'Transaction',
              id: '0x1e1357d757cc61981d7c54051e2a2da36c288df785eda4bfb6d90b0c7a01432f',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [
          {
            __typename: 'Mint',
            amount0: '500000000000000',
            amount1: '2.95',
            amountUSD: '5850.556038815752080202900438348358',
            liquidity: '1214.495780149111920977',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xac3b64fe4d7411b57f509a98f9c3de0f2df10a69',
                symbol: 'FuckEver',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x3816fe325b3f017390e941c787f91ad35a35c3fe',
            transaction: {
              __typename: 'Transaction',
              id: '0x1be8fc289baaa563d270839f7c47b3258156389c749878bbea9f3bf01eeeac9e',
              timestamp: TimeStamp,
            },
          },
        ],
        swaps: [],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '5302106.540807742',
            amount0Out: '35084700000',
            amount1In: '0.031634283349897052',
            amount1Out: '0',
            amountUSD: '62.73862734642757349671169360043267',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa2b4c0af19cc16a6cfacce81f192b024d625817d',
                symbol: 'KISHU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xe4feed5526b73336cbcf6f306b624c22bea7ea25',
            transaction: {
              __typename: 'Transaction',
              id: '0xffcb4000e8d39962198b1759573bc4cf2995c65eb519ba115f31cd159d51aefa',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '0.054606550575940961',
            amount1In: '187.958421258777412047',
            amount1Out: '0',
            amountUSD: '108.2983290427206417378040123484129',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
                symbol: 'GRT',
              },
            },
            to: '0x11111112542d85b3ef69ae05771c2dccff4faa26',
            transaction: {
              __typename: 'Transaction',
              id: '0xfaa5af87019cf1b0048ecdcbe13d4c37100762e290f3a0c6fbf6b1b2e715bce4',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '64323615.666503587901260979',
            amount1In: '0.0306387981287172',
            amount1Out: '0',
            amountUSD: '60.76406963187226405521064040764731',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3301ee63fb29f863f2333bd4466acb46cd8323e6',
                symbol: 'AKITA',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x43afdf5985443421fa1118b2f753a46f74f2f35a',
            transaction: {
              __typename: 'Transaction',
              id: '0xf6c0d3d0282ce4fa906896dd8b707f52ed83db0d61f029bd38b28bbe3de1226f',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '2043.893446815916531712',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '0.563705854851848102',
            amountUSD: '1117.968476458771505976465687990838',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xb1191f691a355b43542bea9b8847bc73e7abb137',
                symbol: 'KIRO',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
            transaction: {
              __typename: 'Transaction',
              id: '0xee9bada3af5ecd66d27135c2c0266e1f315988f75b8c7da01db5dd223af62a96',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '300',
            amount1In: '2.202866545626372492',
            amount1Out: '0',
            amountUSD: '4368.830542842530986048103306607193',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x3d6f0dea3ac3c607b3998e6ce14b6350721752d9',
                symbol: 'CARDS',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x14ac9e1f5835c329ae31bdb38ffeff29c8f0f1bf',
            transaction: {
              __typename: 'Transaction',
              id: '0xed748d6643ee92b58d64e486010445144f4d703a00493b73c2bd08e897596a0b',
              timestamp: TimeStamp,
            },
          },
          {
            __typename: 'Swap',
            amount0In: '4383.978417',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '2.202866545626372492',
            amountUSD: '4375.310881749303331097047990614462',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                symbol: 'USDC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x94ae6d2390680ac6e6ee6069be42067d6ad72e2a',
            transaction: {
              __typename: 'Transaction',
              id: '0xed748d6643ee92b58d64e486010445144f4d703a00493b73c2bd08e897596a0b',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0.08',
            amount0Out: '0',
            amount1In: '0',
            amount1Out: '45485421.192102856756708767',
            amountUSD: '158.6598353501357125723083990575847',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
              token1: {
                __typename: 'Token',
                id: '0xdffdc00abf0ccd93723f56ba3179015ab4e5c1c8',
                symbol: 'BALLBAG',
              },
            },
            to: '0x332c253d758cd9b6151a4ebebd63d7892241a689',
            transaction: {
              __typename: 'Transaction',
              id: '0xeced065d5382d353bc03ac80924e42f6166281cd5a11b57e8a1c568068ecdcda',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '351509912370.012682766',
            amount0Out: '97594465814128.186864894',
            amount1In: '0.03',
            amount1Out: '0',
            amountUSD: '59.67618475729363237874467837239814',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x816ecb90e2c80c878007edba4a9a5312c81a10d7',
                symbol: 'PPC',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x3a62b11b7043724ea6c2203849952269d260db49',
            transaction: {
              __typename: 'Transaction',
              id: '0xe6363ead0f4708b3f8c03176c4027847b87c28a3bf3f7e4b575dbf7770dcb65f',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '0',
            amount0Out: '2172635.497531956092496387',
            amount1In: '0.007525716014521985',
            amount1Out: '0',
            amountUSD: '14.9253607969492210416745380207678',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
                symbol: 'SHIB',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0x8df6084e3b84a65ab9dd2325b5422e5debd8944a',
            transaction: {
              __typename: 'Transaction',
              id: '0xd1db86a9b9d7d8aaea23378b6711e15b66024c3ce9ba614ea05027137265e403',
              timestamp: TimeStamp,
            },
          },
        ],
      },
      {
        __typename: 'Transaction',
        burns: [],
        mints: [],
        swaps: [
          {
            __typename: 'Swap',
            amount0In: '202635701.752302823',
            amount0Out: '702410545443.564510611',
            amount1In: '0.03',
            amount1Out: '0',
            amountUSD: '59.49718998649704465040989409618593',
            pair: {
              __typename: 'Pair',
              token0: {
                __typename: 'Token',
                id: '0x1997830b5beb723f5089bb8fc38766d419a0444d',
                symbol: 'NEWINU',
              },
              token1: {
                __typename: 'Token',
                id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                symbol: 'WETH',
              },
            },
            to: '0xe4c725c6721511202b42cafa526b81b2586d3993',
            transaction: {
              __typename: 'Transaction',
              id: '0xc1751dda1608829f9147cb4e39eee05751835e53528d3b48c7b7371e3878f948',
              timestamp: TimeStamp,
            },
          },
        ],
      },
    ],
  },
}
