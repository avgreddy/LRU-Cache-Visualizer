import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const LRUVisualizer = () => {
  const [cache, setCache] = useState([]);
  const [hashMap, setHashMap] = useState({});
  const [capacity, setCapacity] = useState(3);

  const updateCache = (key, value) => {
    let newCache = [...cache];
    let newHashMap = { ...hashMap };

    if (newHashMap[key]) {
      newCache = newCache.filter((item) => item.key !== key);
    } else if (newCache.length >= capacity) {
      const removed = newCache.pop();
      delete newHashMap[removed.key];
    }

    const newNode = { key, value };
    newCache.unshift(newNode);
    newHashMap[key] = newNode;

    setCache(newCache);
    setHashMap(newHashMap);
  };

  const getFromCache = (key) => {
    if (!hashMap[key]) return;
    let newCache = cache.filter((item) => item.key !== key);
    newCache.unshift(hashMap[key]);
    setCache(newCache);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">LRU Cache Visualizer</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          placeholder="Key"
          id="keyInput"
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Value"
          id="valueInput"
          className="border p-2 rounded"
        />
        <Button
          onClick={() => {
            const key = parseInt(document.getElementById("keyInput").value);
            const value = parseInt(document.getElementById("valueInput").value);
            updateCache(key, value);
          }}
        >
          Put
        </Button>
        <Button
          onClick={() => {
            const key = parseInt(document.getElementById("keyInput").value);
            getFromCache(key);
          }}
        >
          Get
        </Button>
      </div>
      <div className="flex space-x-4 mb-4">
        {cache.map((node) => (
          <motion.div
            key={node.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-2 text-center bg-blue-100 rounded-lg">
              <CardContent>
                <p>Key: {node.key}</p>
                <p>Value: {node.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <h3 className="text-lg font-bold mb-2">HashMap Status</h3>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(hashMap).map((key) => (
          <Card key={key} className="p-2 text-center bg-green-100 rounded-lg">
            <CardContent>
              <p>Key: {key}</p>
              <p>Value: {hashMap[key].value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LRUVisualizer;
