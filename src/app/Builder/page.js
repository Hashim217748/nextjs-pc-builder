"use client";
import * as React from "react";
import Screen from "../Components/Screen";
import Sidebar from "../Components/sidebar";
import Table from "../Components/Table";
import { useState, useEffect } from "react";
import ModalComponent from "../Components/Modal";
import {
  Add,
  AddCircleOutline,
  Delete,
  ErrorOutline,
  Forward,
  Forward5TwoTone,
  ForwardRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import axios from "axios";

const types = ["High-End", "Mid-Range", "Budget"];

export default function Builder() {
  //State
  useEffect(() => {
    const fetchStorages = async () => {
      const data = await fetchData("/api/Storage");
      setStorages(data.data);
    };
    const fetchMemory = async () => {
      const data = await fetchData("/api/Memory");
      setMemory(data.data);
    };
    const fetchCasings = async () => {
      const data = await fetchData("/api/Casing");
      setCasings(data.data);
    };
    const fetchCpus = async () => {
      const data = await fetchData("/api/Cpu");
      setCpus(data.data);
    };
    const fetchGpus = async () => {
      const data = await fetchData("/api/Gpu");
      setGpus(data.data);
    };
    const fetchMbs = async () => {
      const data = await fetchData("/api/Mb");
      setMbs(data.data);
    };
    const fetchPsus = async () => {
      const data = await fetchData("/api/Psu");
      setPsus(data.data);
      console.log(data.data);
    };
    const fetchMonitors = async () => {
      const data = await fetchData("/api/Monitor");
      setMonitors(data.data);
    };
    fetchMemory();
    fetchMbs();
    fetchGpus();
    fetchCpus();
    fetchPsus();
    fetchCasings();
    fetchStorages();
    fetchMonitors();
  }, []);
  const [storages, setStorages] = useState([]);
  const [memory, setMemory] = useState([]);
  const [casings, setCasings] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [mbs, setMbs] = useState([]);
  const [psus, setPsus] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCpu, setCpu] = useState(null);
  const [selectedGpu, setGpu] = useState(null);
  const [selectedMb, setMb] = useState(null);
  const [selectedRam, setRam] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [selectedStorage, setStorage] = useState(null);
  const [selectedCasing, setCasing] = useState(null);
  const [selectedMonitor, setMonitor] = useState(null);
  const [selectedPsu, setPsu] = useState(null);
  const [selectedType, setType] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const alertState = localStorage.getItem("alertVisible");
    if (alertState === "true") {
      setAlertVisible(true);
    }
  }, []);

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
        localStorage.setItem("alertVisible", "false");
      }, 3000); // Alert will disappear after 3 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [alertVisible]);
  const handleOpen = (modalId) => {
    setOpenModal(modalId);
  };
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleClose = () => {
    setOpenModal(null);
    const handleSetCpu = (cpu) => {
      setCpu(cpu);
    };
    const handleSetGpu = (gpu) => {
      setGpu(gpu);
      // setOpen(false);
    };
    const handleSetMb = (mb) => {
      setMb(mb);
      // setOpen(false);
    };
    const handleSetStorage = (storage) => {
      setStorage(storage);
      // setOpen(false);
    };
    const handleSetRam = (ram) => {
      setRam(ram);
      // setOpen(false);
    };
    const handleSetCasing = (casing) => {
      setCasing(casing);
      // setOpen(false);
    };
    const handleSetMonitor = (monitor) => {
      setMonitor(monitor);
      // setOpen(false);
    };
    const handleSetPsu = (psu) => {
      setPsu(psu);
      // setOpen(false);
    };
    const handleSetType = (type) => {
      setType(type);
    };
  };

  // Functions

  const fetchData = async (path) => {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status} in ${path}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of error to handle it gracefully
    }
  };
  const reset = () => {
    setCpu(null);
    setGpu(null);
    setMb(null);
    setRam(null);
    setStorage(null);
    setCasing(null);
    setMonitor(null);
    setPsu(null);
    setType(null);
  };

  const forceMbCompatibility = () => {
    if (isChecked && selectedCpu) {
      const compatibleMotherboards = mbs.filter(
        (mb) => mb.socket === selectedCpu.socket
      );
      return compatibleMotherboards;
    }
  };
  const forceGpuCompatibility = () => {
    if (isChecked && selectedMb) {
      const compatibleGpus = gpus.filter((gpu) => gpu.pcie === selectedMb.pcie);
      return compatibleGpus;
    }
  };

  const forceCasingCompatibility = () => {
    if (isChecked && selectedMb) {
      const compatibleCasing = casings.filter((casing) =>
        casing.formFactor.includes(selectedMb.formFactor)
      );
      return compatibleCasing;
    }
  };
  const handleLogout = () => {
    console.log("logged Out");
    localStorage.removeItem("token");
  };

  const forcePsuCompatibility = () => {
    if (
      isChecked &&
      selectedMb &&
      selectedCpu &&
      selectedGpu &&
      selectedRam &&
      selectedStorage
    ) {
      const compatiblePsus = psus.filter(
        (psu) => psu.wattage >= calculateTotalWattage()
      );
      return compatiblePsus;
    }
  };

  const suggestor = (type) => {
    var testmb = [];
    if (type == "High-End") {
      const highEndmb = mbs.filter((mb) => mb.priceRange === "High");
      testmb = highEndmb[Math.floor(Math.random() * highEndmb.length)];
      setMb(testmb);
      const highEndcpu = cpus.filter(
        (cpu) => cpu.priceRange === "High" && cpu.socket === testmb.socket
      );
      setCpu(highEndcpu[Math.floor(Math.random() * highEndcpu.length)]);
      const highEndgpu = gpus.filter(
        (gpu) => gpu.priceRange === "High" && gpu.pcie === testmb.pcie
      );
      const highEndram = memory.filter(
        (ram) => ram.priceRange === "High" && ram.type === testmb.ddr
      );
      const highEndstorage = storages.filter(
        (storage) => storage.priceRange === "High"
      );
      const highEndcasing = casings.filter(
        (casing) => casing.priceRange === "High"
      );
      const highEndmonitor = monitors.filter(
        (monitor) => monitor.priceRange === "High"
      );
      const highEndpsu = psus.filter((psu) => psu.priceRange === "High");

      setGpu(highEndgpu[Math.floor(Math.random() * highEndgpu.length)]);
      setRam(highEndram[Math.floor(Math.random() * highEndram.length)]);
      setStorage(
        highEndstorage[Math.floor(Math.random() * highEndstorage.length)]
      );
      setCasing(
        highEndcasing[Math.floor(Math.random() * highEndcasing.length)]
      );
      setMonitor(
        highEndmonitor[Math.floor(Math.random() * highEndmonitor.length)]
      );
      setPsu(highEndpsu[Math.floor(Math.random() * highEndpsu.length)]);
    }
    if (type == "Mid-Range") {
      const midRangemb = mbs.filter((mb) => mb.priceRange === "Mid");
      testmb = midRangemb[Math.floor(Math.random() * midRangemb.length)];
      setMb(testmb);

      const midRangecpu = cpus.filter(
        (cpu) => cpu.priceRange === "Mid" && cpu.socket === testmb.socket
      );
      const midRangegpu = gpus.filter(
        (gpu) => gpu.priceRange === "Mid" && gpu.pcie === testmb.pcie
      );
      const midRangeram = memory.filter(
        (ram) => ram.priceRange === "Mid" && ram.type === testmb.ddr
      );
      const midRangestorage = storages.filter(
        (storage) => storage.priceRange === "Mid"
      );
      const midRangecasing = casings.filter(
        (casing) => casing.priceRange === "Mid"
      );
      const midRangemonitor = monitors.filter(
        (monitor) => monitor.priceRange === "Mid"
      );
      const midRangepsu = psus.filter((psu) => psu.priceRange === "Mid");

      setCpu(midRangecpu[Math.floor(Math.random() * midRangecpu.length)]);
      setGpu(midRangegpu[Math.floor(Math.random() * midRangegpu.length)]);
      setRam(midRangeram[Math.floor(Math.random() * midRangeram.length)]);
      setStorage(
        midRangestorage[Math.floor(Math.random() * midRangestorage.length)]
      );
      setCasing(
        midRangecasing[Math.floor(Math.random() * midRangecasing.length)]
      );
      setMonitor(
        midRangemonitor[Math.floor(Math.random() * midRangemonitor.length)]
      );
      setPsu(midRangepsu[Math.floor(Math.random() * midRangepsu.length)]);
    }
    if (type == "Budget") {
      const budgetmb = mbs.filter((mb) => mb.priceRange === "Low");
      testmb = budgetmb[Math.floor(Math.random() * budgetmb.length)];
      setMb(testmb);
      const budgetcpu = cpus.filter(
        (cpu) => cpu.priceRange === "Low" && cpu.socket === testmb.socket
      );
      const budgetgpu = gpus.filter(
        (gpu) => gpu.priceRange === "Low" && gpu.pcie === testmb.pcie
      );
      const budgetram = memory.filter(
        (ram) => ram.priceRange === "Low" && ram.type === testmb.ddr
      );
      const budgetstorage = storages.filter(
        (storage) => storage.priceRange === "Low"
      );
      const budgetcasing = casings.filter(
        (casing) => casing.priceRange === "Low"
      );
      const budgetmonitor = monitors.filter(
        (monitor) => monitor.priceRange === "Low"
      );
      const budgetpsu = psus.filter((psu) => psu.priceRange === "Low");

      setCpu(budgetcpu[Math.floor(Math.random() * budgetcpu.length)]);
      setGpu(budgetgpu[Math.floor(Math.random() * budgetgpu.length)]);
      setRam(budgetram[Math.floor(Math.random() * budgetram.length)]);
      setStorage(
        budgetstorage[Math.floor(Math.random() * budgetstorage.length)]
      );
      setCasing(budgetcasing[Math.floor(Math.random() * budgetcasing.length)]);
      setMonitor(
        budgetmonitor[Math.floor(Math.random() * budgetmonitor.length)]
      );
      setPsu(budgetpsu[Math.floor(Math.random() * budgetpsu.length)]);
    }
  };
  const calculateTotalWattage = () => {
    let total = 0;

    if (selectedCpu) total += selectedCpu.wattage;
    if (selectedGpu) total += selectedGpu.wattage;
    if (selectedRam) total += selectedRam.wattage;
    if (selectedStorage) total += selectedStorage.wattage;
    if (selectedCasing) total += selectedCasing.wattage;
    if (selectedMonitor) total += selectedMonitor.wattage;
    if (selectedMb) total += selectedMb.wattage;
    return total;
  };
  const calculateTotalPrice = () => {
    let total = 0;

    if (selectedCpu) total += selectedCpu.price;
    if (selectedGpu) total += selectedGpu.price;
    if (selectedRam) total += selectedRam.price;
    if (selectedStorage) total += selectedStorage.price;
    if (selectedCasing) total += selectedCasing.price;
    if (selectedMonitor) total += selectedMonitor.price;
    if (selectedMb) total += selectedMb.price;
    return total;
  };
  const checkout = async () => {
    if (
      selectedCpu &&
      selectedGpu &&
      selectedCasing &&
      selectedMb &&
      selectedMonitor &&
      selectedPsu &&
      selectedRam &&
      selectedStorage
    ) {
      const newCpu = { ...selectedCpu, stock: selectedCpu.stock - 1 };
      await axios.put(`/api/Cpu?_id=${selectedCpu._id}`, newCpu);
      const newGpu = { ...selectedGpu, stock: selectedGpu.stock - 1 };
      await axios.put(`/api/Gpu?_id=${selectedGpu._id}`, newGpu);
      const newCasing = { ...selectedCasing, stock: selectedCasing.stock - 1 };
      await axios.put(`/api/Casing?_id=${selectedCasing._id}`, newCasing);
      const newMb = { ...selectedMb, stock: selectedMb.stock - 1 };
      await axios.put(`/api/Mb?_id=${selectedMb._id}`, newMb);
      const newMonitor = {
        ...selectedMonitor,
        stock: selectedMonitor.stock - 1,
      };
      await axios.put(`/api/Monitor?_id=${selectedMonitor._id}`, newMonitor);
      const newPsu = { ...selectedPsu, stock: selectedPsu.stock - 1 };
      await axios.put(`/api/Psu?_id=${selectedPsu._id}`, newPsu);
      const newRam = { ...selectedRam, stock: selectedRam.stock - 1 };
      await axios.put(`/api/Memory?_id=${selectedRam._id}`, newRam);
      const newStorage = {
        ...selectedStorage,
        stock: selectedStorage.stock - 1,
      };
      await axios.put(`/api/Storage?_id=${selectedStorage._id}`, newStorage);
      reset();
    }
  };
  const login = () => {
    if (localStorage.getItem("token")) {
      console.log("logging in");
      setAlertVisible(true);
    }
  };

  return (
    <Screen>
      <Sidebar />
      {/* HTML CODE */}
      <div className=" flex flex-col w-full">
        <div className=" flex-row pt-10 mb-6 bg-slate-900 text-center">
          {localStorage.getItem("alertVisible") && (
            <div
              id="alert-border-3"
              className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
              role="alert"
            >
              <svg
                className="shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div className="ms-3 text-sm font-medium">
                Logged in Successfully.
              </div>
            </div>
          )}
          <div className="flex justify-center items-center h-fit">
            <label className="inline-flex items-center me-5 cursor-pointer">
              {" "}
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggle}
              />{" "}
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>{" "}
              <span className="ms-3 text-sm font-medium text-gray-200 dark:text-gray-300">
                Show Only Compatible Parts
              </span>{" "}
            </label>{" "}
            <button
              onClick={() => handleOpen("suggestion")}
              className=" px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel  hover:text-white "
            >
              {selectedType ? selectedType : "Suggest a Build"}
            </button>
            {selectedType ? (
              <button
                onClick={() => setType(null)}
                className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
              >
                <Delete></Delete>
              </button>
            ) : (
              ""
            )}
            {selectedCpu ||
            selectedGpu ||
            selectedRam ||
            selectedStorage ||
            selectedCasing ||
            selectedMonitor ||
            selectedMb ||
            selectedPsu ? (
              <button
                onClick={() => reset()}
                className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
              >
                Clear All
              </button>
            ) : (
              ""
            )}
            {!localStorage.getItem("token") ? (
              <div className="absolute right-10">
                <Link href="/Login">
                  <button className="px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel  hover:text-white ">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="absolute right-10">
                <button
                  onClick={handleLogout}
                  className="px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel  hover:text-white "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <p className="flex-row-reverse pr-20 mx-10 py-5 px-5 text-blue-600 font-funnel text-xl font-bold">
            Total Wattage:
            {calculateTotalWattage()}
          </p>
        </div>
        {/* CPU Button */}
        <div className="flex items-center h-fit flex-row my-4 mx-10">
          <button
            className="  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel  hover:text-white "
            onClick={() => handleOpen("cpu")}
          >
            {selectedCpu ? `${selectedCpu.name}` : "Choose Your CPU"}
          </button>
          {selectedCpu ? (
            <button
              onClick={() => {
                console.log(selectedCpu.socket);
                setCpu(null);
              }}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
        </div>
        {/* Motherboard button */}
        <div className="flex items-center h-fit flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedCpu}
            className={
              isChecked && !selectedCpu
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("mb")}
          >
            {selectedMb ? `${selectedMb.name}` : "Choose Your MotherBoard"}
          </button>
          {selectedMb ? (
            <button
              onClick={() => {
                setMb(null);
                console.log(selectedMb.socket);
              }}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
          {selectedMb &&
          selectedCpu &&
          selectedCpu.socket !== selectedMb.socket ? (
            <div className="flex p-2 rounded-md text-center bg-red-600 items-center h-fit flex-row my-4 mx-10">
              <ErrorOutline className="text-white ml-2 text-3xl"></ErrorOutline>
              <p className="font-funnel text-white font-bold">
                The CPU and the Motherboard aren't Compatible. Choose a
                Motherboard With the {selectedCpu.socket} Socket
              </p>
            </div>
          ) : (
            ""
          )}
          {/* {selectedMb ? (
            <div className="flex p-2 rounded-md text-center bg-green-600 items-center h-fit flex-row my-4 mx-10">
              <p className="text-white font-funnel font-bold">
                Motherboard Socket: {selectedMb.socket}
              </p>
            </div>
          ) : (
            ""
          )} */}
        </div>
        {/* GPU button */}
        <div className="flex items-center h-fit flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedMb}
            className={
              isChecked && !selectedMb
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("gpu")}
          >
            {selectedGpu ? `${selectedGpu.name}` : "Choose Your GPU"}
          </button>
          {selectedGpu ? (
            <button
              onClick={() => setGpu(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
          {selectedMb && selectedGpu && selectedGpu.pcie !== selectedMb.pcie ? (
            <div className="flex p-2 rounded-md text-center bg-red-600 items-center h-fit flex-row my-4 mx-10">
              <ErrorOutline className="text-white ml-2 text-3xl"></ErrorOutline>
              <p className="font-funnel text-white font-bold">
                The GPU and the Motherboard aren't Compatible. Choose a
                Motherboard With {selectedGpu.pcie}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Memory button */}
        <div className="flex items-center h-fit flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedGpu}
            className={
              isChecked && !selectedGpu
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("ram")}
          >
            {selectedRam ? `${selectedRam.name}` : "Choose Your Memory"}
          </button>
          {selectedRam ? (
            <button
              onClick={() => setRam(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
          {selectedMb && selectedRam && selectedRam.type !== selectedMb.ddr ? (
            <div className="flex p-2 rounded-md text-center bg-red-600 items-center h-fit flex-row my-4 mx-10">
              <ErrorOutline className="text-white ml-2 text-3xl"></ErrorOutline>
              <p className="font-funnel text-white font-bold">
                The RAM and the Motherboard isn't Compatible. Choose a
                Motherboard With {selectedRam.type}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Storage button */}
        <div className="flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedRam}
            className={
              isChecked && !selectedRam
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("storage")}
          >
            {selectedStorage
              ? `${selectedStorage.name}`
              : "Choose Your Storage"}
          </button>
          {selectedStorage ? (
            <button
              onClick={() => setStorage(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
        </div>
        {/* Casing button */}
        <div className="flex items-center h-fit flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedStorage}
            className={
              isChecked && !selectedStorage
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("casing")}
          >
            {selectedCasing ? `${selectedCasing.name}` : "Choose Your Casing"}
          </button>
          {selectedCasing ? (
            <button
              onClick={() => setCasing(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
          {selectedMb &&
          selectedCasing &&
          !selectedCasing.formFactor.includes(selectedMb.formFactor) ? (
            <div className="flex p-2 rounded-md text-center bg-red-600 items-center h-fit flex-row my-4 mx-10">
              <ErrorOutline className="text-white ml-2 text-3xl"></ErrorOutline>
              <p className="font-funnel text-white font-bold">
                The Motherboard and Casing aren't Compatible. Choose a
                Motherboard With the form Factor including{" "}
                {selectedCasing.formFactor}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Power Supply button */}
        <div className="flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedCasing}
            className={
              isChecked && !selectedCasing
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("psu")}
          >
            {selectedPsu ? `${selectedPsu.name}` : "Choose Your Power Supply"}
          </button>
          {selectedPsu ? (
            <button
              onClick={() => setPsu(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
        </div>
        {/* Monitor button */}
        <div className="flex-row my-4 mx-10">
          <button
            disabled={isChecked && !selectedPsu}
            className={
              isChecked && !selectedPsu
                ? "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel   opacity-50"
                : "  px-9 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel hover:text-white"
            }
            // onClick={handleOpen}
            onClick={() => handleOpen("monitor")}
          >
            {selectedMonitor
              ? `${selectedMonitor.name}`
              : "Choose Your Monitor"}
          </button>
          {selectedMonitor ? (
            <button
              onClick={() => setMonitor(null)}
              className="bg-red-500 font-funnel font-extrabold hover:text-white   text-main ml-3 px-4 py-4 rounded-2xl"
            >
              <Delete></Delete>
            </button>
          ) : (
            ""
          )}
        </div>
        <ModalComponent
          open={openModal == "cpu"}
          handleClose={handleClose}
          title={"Choose Your CPU"}
        >
          <Table
            data={cpus}
            handleSelect={(cpu) => {
              handleClose();
              setCpu(cpu);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "gpu"}
          handleClose={handleClose}
          title={"Choose Your GPU"}
        >
          <Table
            data={isChecked ? forceGpuCompatibility() : gpus}
            handleSelect={(gpu) => {
              handleClose();
              setGpu(gpu);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "mb"}
          handleClose={handleClose}
          title={"Choose Your MotherBoard"}
        >
          <Table
            data={isChecked ? forceMbCompatibility() : mbs}
            handleSelect={(mb) => {
              handleClose();
              setMb(mb);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "casing"}
          handleClose={handleClose}
          title={"Choose Your Casing"}
        >
          <Table
            data={isChecked ? forceCasingCompatibility() : casings}
            handleSelect={(casing) => {
              handleClose();
              setCasing(casing);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "storage"}
          handleClose={handleClose}
          title={"Choose Your Storage"}
        >
          <Table
            data={storages}
            handleSelect={(storage) => {
              handleClose();
              setStorage(storage);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "ram"}
          handleClose={handleClose}
          title={"Choose Your Memory"}
        >
          <Table
            data={memory}
            handleSelect={(ram) => {
              handleClose();
              setRam(ram);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "psu"}
          handleClose={handleClose}
          title={"Choose Your Power Supply"}
        >
          <Table
            data={isChecked ? forcePsuCompatibility() : psus}
            handleSelect={(psu) => {
              handleClose();
              setPsu(psu);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "monitor"}
          handleClose={handleClose}
          title={"Choose Your Monitor"}
        >
          <Table
            data={monitors}
            handleSelect={(monitor) => {
              handleClose();
              setMonitor(monitor);
            }}
          />
        </ModalComponent>
        <ModalComponent
          open={openModal == "suggestion"}
          handleClose={handleClose}
          title={"Choose Your Build Type"}
        >
          <table className="min-w-full divide-y divide-gray-200 border-2 border-white ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-7 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Selection
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {types.map((type, index) => (
                <tr key={index}>
                  <th className="align-middle">
                    <button
                      onClick={() => {
                        handleClose();
                        console.log(type);
                        setType(type);
                        suggestor(type);
                      }}
                      className=" mr-2 p-2 px-2 rounded-xl text-white bg-blue-600"
                    >
                      <Add></Add>
                    </button>
                  </th>
                  <td className="font-bold px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                    {type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalComponent>
        <div className="h-full pt-2 bg-slate-900 text-center">
          <p className="flex-row-reverse ml-20 pr-20 mx-10 py-5 px-5 text-blue-600 font-funnel text-xl font-bold">
            Total Price:
            {calculateTotalPrice()}$
          </p>
          <button
            onClick={checkout}
            className="flex-row-reverse mb-6 my-2 px-4 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel  hover:text-white "
          >
            Proceed To Checkout <ForwardRounded></ForwardRounded>
          </button>
        </div>
      </div>
    </Screen>
  );
}
