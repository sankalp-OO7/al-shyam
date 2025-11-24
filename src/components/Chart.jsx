import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function MarketCard() {
  const [gold, setGold] = useState({
    price: "Loading...",
    change: "0.00",
    isPositive: true,
  });

  const [btc, setBtc] = useState({
    price: "Loading...",
    change: "0.00",
    isPositive: true,
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // -----------------------
  //  GOLD API
  // -----------------------
  async function fetchGold() {
    try {
      const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD");

      if (res.ok) {
        const data = await res.json();

        if (data && data.items && data.items.length > 0) {
          // Find USD item (not XAU)
          const usdData = data.items.find((item) => item.curr === "USD");

          if (usdData) {
            const price = parseFloat(usdData.xauPrice);
            // Use pcXau which is the percentage change already calculated
            const percentChange = parseFloat(usdData.pcXau || 0);

            setGold({
              price:
                "$" +
                price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              change: percentChange.toFixed(2),
              isPositive: percentChange >= 0,
            });
            setLastUpdate(new Date());
            return true;
          }
        }
      }
    } catch (err) {
      console.log("GoldPrice.org error, trying backup...");
    }

    try {
      const res = await fetch("https://api.gold-api.com/price/XAU");

      if (res.ok) {
        const data = await res.json();

        if (data && data.price) {
          const price = parseFloat(data.price);
          const prev = parseFloat(
            data.prev_close_price || data.open_price || price
          );
          const diff = prev !== 0 ? ((price - prev) / prev) * 100 : 0;

          setGold({
            price:
              "$" +
              price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            change: diff.toFixed(2),
            isPositive: diff >= 0,
          });
          setLastUpdate(new Date());
          return true;
        }
      }
    } catch (err) {
      console.log("Gold-API error");
    }

    setGold({
      price: "$4,065.00",
      change: "0.32",
      isPositive: true,
    });
    setLastUpdate(new Date());
    return false;
  }

  // -----------------------
  //  BITCOIN API
  // -----------------------
  async function fetchBTC() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      );

      if (res.ok) {
        const data = await res.json();

        if (data && data.bitcoin && data.bitcoin.usd) {
          const price = data.bitcoin.usd;
          const change24h = data.bitcoin.usd_24h_change || 0;

          setBtc({
            price:
              "$" +
              price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            change: change24h.toFixed(2),
            isPositive: change24h >= 0,
          });
          setLastUpdate(new Date());
          return true;
        }
      }
    } catch (err) {
      console.log("CoinGecko API error, trying Coinbase...");
    }

    try {
      const res = await fetch(
        "https://api.coinbase.com/v2/prices/BTC-USD/spot"
      );

      if (res.ok) {
        const data = await res.json();

        if (data && data.data && data.data.amount) {
          const price = parseFloat(data.data.amount);

          setBtc((prev) => ({
            price:
              "$" +
              price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            change: prev.change !== "0.00" ? prev.change : "0.00",
            isPositive: prev.isPositive,
          }));
          setLastUpdate(new Date());
          return true;
        }
      }
    } catch (err) {
      console.log("Coinbase API error");
    }

    setBtc({
      price: "$98,500.00",
      change: "1.25",
      isPositive: true,
    });
    setLastUpdate(new Date());
    return false;
  }

  // -----------------------
  //  FETCH BOTH
  // -----------------------
  async function fetchAllPrices() {
    console.log("Fetching prices at:", new Date().toLocaleTimeString());
    await Promise.all([fetchGold(), fetchBTC()]);
  }

  // -----------------------
  //  FETCH LOOP (5 MINUTES)
  // -----------------------
  useEffect(() => {
    fetchAllPrices();
    const id = setInterval(fetchAllPrices, 300000);
    return () => clearInterval(id);
  }, []);

  // -----------------------
  //  MARKET ITEM COMPONENT
  // -----------------------
  const MarketItem = ({ label, data }) => {
    const Icon = data.isPositive ? TrendingUp : TrendingDown;
    const textColor = data.isPositive ? "text-green-400" : "text-red-400";
    const changeValue = parseFloat(data.change);

    return (
      <div className="relative flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <BarChart3 className="w-4 h-4 text-yellow-400" />
          </motion.div>
          <div>
            <div className="text-white font-bold text-sm lg:text-base">
              {label}
            </div>
            <div className="text-gray-400 text-[10px]">Real-time</div>
          </div>
        </div>
        <div className="text-right">
          <motion.div
            className="text-lg lg:text-xl font-black text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {data.price}
          </motion.div>
          <motion.div
            className={`${textColor} text-xs font-semibold flex items-center justify-end gap-1`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className="w-3 h-3" />
            {changeValue >= 0 ? "+" : ""}
            {changeValue}%
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <MarketItem label="XAU/USD" data={gold} />
      <div className="my-4"></div>
      <MarketItem label="BTC/USD" data={btc} />
    </div>
  );
}
