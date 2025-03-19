"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { GoArrowUpRight } from "react-icons/go";
import { Avatar, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import Image from "next/image";
import {
  FaArrowRightLong,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const inter = Inter({ subsets: ["latin"] });
export default function Homepage() {
  const [productList, setProductList] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    getPackagingType();
    fetchData();
    const updateColumns = () => {
      setColumns(window.innerWidth < 900 ? 2 : 3);
    };

    updateColumns(); // Set initial value
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  async function getPackagingType() {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/resources/packaging-type`
      );
      if (response.status === 200) {
        const responseData = response.data.data.map((ele) => {
          return {
            packaging_id: ele.packaging_id,
            icon: ele.packaging_image_icon_url,
            description: ele.description,
            name: ele.name,
            time: "4-7 weeks",
            minimum_qty: ele.minimum_qty,
            price: "₹ 0.930",
            packaging_image_url: ele.packaging_image_url,
            quantity: ele.minimum_qty,
          };
        });
        setProductList(responseData);
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  const questions = [
    "Why should I buy icons?",
    "How are these icons different from other packs?",
    "What are the benefits of using native Figma icons?",
    "Where can I use Anron Icons?",
    "Is it a one-time payment?",
    "Can I get a refund?",
    "What’s included in the free version?",
    "How will I receive free updates?",
    "Can I get a discount?",
    "Can I upgrade to a team or enterprise plan?",
    "Can I continue to use the icons if I leave the team?",
  ];

  const fetchData = async () => {
    const response = [
      {
        id: 1,
        name: "Alexander Akers",
        role: "Senior iOS Engineer, Apple",
        message:
          "I get worried when I use a computer without @paste_app. What if there’s something important on the clipboard? It’s like how you can 'hold' a piece in Tetris, but you have to remember what it is. Paste helps you keep everything in one place, effortlessly.",
      },
      {
        id: 2,
        name: "Chris Messina",
        role: "Hashtag Inventor",
        message:
          "This is a must-have Mac app for me. I use it dozens if not hundreds of times a day. So useful!",
      },
      {
        id: 3,
        name: "João Cunha",
        role: "Senior Product Manager, Nubank",
        message:
          "Few things have had as much impact on my Mac workflow as @paste_app. It may look irrelevant, but think of how many times you copy/paste things over the course of a day. Paste makes this process a gazillion times better. It’s a life-changer for my work, productivity, and creativity.",
      },
      {
        id: 4,
        name: "Sammy Schuckert",
        role: "UX Designer, IBM",
        message:
          "I'm a heavy @paste_app user for 3 years. Paste is core to my everyday workflows. Even while writing this tweet, I’m using it. It provides me with superpowers and makes me crazy efficient. Every time someone sees me using it they go like, 'Oh hey, what was that? I want that!'",
      },
      {
        id: 5,
        name: "Kristen Wright",
        role: "Marketing, Day One Journal",
        message:
          "Finally bought @paste_app and I'm really digging it. Great for code snippets, hex colors & links you frequently use. It’s made organizing all my work a breeze!",
      },
      {
        id: 6,
        name: "Diego Freniche Brito",
        role: "Developer Advocate, Realm/MongoDB",
        message:
          "Using a clipboard manager has become second nature for me (and a necessity as a developer). Have tried a bunch. @paste_app is the best by far. Instabuy. If you program and aren’t using one of these, you’re wasting time. Your time.",
      },
    ];

    setTestimonials(response);
  };
  return (
    <div className="flex flex-col gap-14 w-full">
      <div className={`${inter.className}`}>
        <div className="flex flex-col items-center gap-8 xs:hidden bg-[#ead4bf] px-[30px] pt-0 max-w-[629px]">
          <div className="flex flex-col items-center gap-3 uppercase">
            <div className="font-medium text-[#143761] text-xs">
              A Sustainable Approach
            </div>
            <div className="text-[51px] text-center max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
              <span className="font-bold text-[#143761]">Eco-Friendly </span>
              <span className="font-medium text-[#03172BB0]">
                Packaging Solutions
              </span>
            </div>
            <div className="font-normal text-[#03172BB0] text-base text-center max-md:text-sm">
              Discover innovative and sustainable packaging options that reduce
              waste and protect our planet.
            </div>
          </div>
          <div className="flex gap-5">
            <Button
              className={`${inter.className} flex justify-center items-center border-[#143761] border-1 bg-transparent rounded-[4px] font-normal text-[#143761] text-sm px-2`}
              variant="bordered"
            >
              Get sample products
            </Button>{" "}
            <Button
              className={`${inter.className} flex justify-center items-center border-[#143761] border-1 bg-transparent rounded-[4px] font-normal px-2 text-sm gap-2 bg-[#143761] text-white`}
            >
              Customize now <GoArrowUpRight />
            </Button>
          </div>
        </div>
        <div
          className="flex items-center border-[#ead4bf] bg-cover bg-center mobile:px-5 xl:px-16 xs:px-8 border-t-2 w-full max-w-full aspect-[1440/713]"
          style={{ backgroundImage: "url('/homepage1.jpg')" }}
        >
          <div className="flex flex-col gap-[60px] max-xs:hidden max-w-[629px]">
            <div className="flex flex-col gap-5 max-md:gap-1 max-lg:gap-3 max-ml:gap-2 uppercase">
              <div className="font-medium text-[#143761] text-sm">
                A Sustainable Approach
              </div>
              <div className="text-[51px] max-md:text-2xl max-lg:text-[40px] max-ml:text-[30px] leading-[60px] max-md:leading-7 max-lg:leading-[45px] max-ml:leading-[35px]">
                <div className="font-bold text-[#143761]">Eco-Friendly</div>
                <div className="font-medium text-[#03172BB0]">
                  Packaging Solutions
                </div>
              </div>
              <div className="font-medium text-[#03172BB0] text-base max-md:text-sm">
                Discover innovative and sustainable packaging options that
                reduce waste and protect our planet.
              </div>
            </div>
            <div className="flex gap-5">
              <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-[4px] font-semibold text-base text-white">
                Customize now <GoArrowUpRight />
              </Button>
              <Button
                className="flex justify-center items-center gap-2 border-[#143761] border-1 bg-transparent rounded-[4px] font-semibold text-[#143761] text-base"
                variant="bordered"
              >
                Get sample products
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mobile:px-5 xl:px-16 xs:px-8 w-full max-w-full">
        <div className="flex justify-center xs:justify-between">
          <div className="font-semibold text-[#143761] text-2xl">
            Shop by popularity
          </div>
          <div className="flex gap-2 max-xs:hidden">
            <HiOutlineArrowLeft className="text-slate-500" />
            <HiOutlineArrowRight />
          </div>
        </div>
        <div className="flex max-md:flex-nowrap gap-5 mobile:gap-8 px-5 overflow-x-auto scrollbar-hide">
          {productList.map((ele, i) => {
            return (
              <Link
                href={`${ele.name
                  .toLocaleLowerCase()
                  .replace(" ", "-")}/packaging-type`}
                key={i}
                className="flex flex-col flex-shrink-0 gap-2 ml:gap-5 max-md:w-[calc(100vw/3)] max-xs:w-[calc(100vw/2)]"
              >
                <Image
                  className="w-full max-w-full aspect-[296/314]"
                  src={ele.packaging_image_url}
                  alt={ele.name}
                  height={395}
                  width={296}
                  style={{ objectFit: "cover" }}
                />
                <div className="flex flex-col gap-1 max-mobile:gap-3 w-full text-left">
                  <div className="font-medium max-mobile:font-medium max-lg:text-sm">
                    {ele.name}
                  </div>
                  <div className="flex justify-center items-center gap-0 bg-gray-200 px-[10px] max-ml:px-[5px] py-[5px] max-ml:py-[2px] rounded-lg lg:w-[170px] max-ml:w-[130px] font-semibold text-[#143761] max-lg:text-sm max-mobile:text-xs">
                    {ele.price}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex max-ml:flex-col flex-grow gap-10 w-full">
        <div className="relative max-ml:w-full ml:w-1/2 aspect-[706/723]">
          <Image src="/homepage2.svg" alt="2" className="rounded-none" fill />
          <div className="bottom-0 left-0 absolute flex flex-col gap-4 bg-[#143761] p-10 max-w-[376px] aspect-[376/197]">
            <div className="font-semibold text-sm text-white">
              We produce sustainable packaging for all type of businesses
            </div>
            <div className="text-[#FFFFFFBF] text-sm">
              Lorem ipsum may be used as a placeholder before the final copy is
              available.
            </div>
            <div className="flex items-center gap-4 text-[#F47A1F] text-sm">
              View reviews
              <FaArrowRightLong color="#F47A1F" />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow justify-between pr-7">
          <div className="flex flex-col gap-4 max-ml:gap-3 p-6 pt-0">
            <div className="flex justify-center w-fit font-semibold text-[#143761] text-[32px] text-center max-md:text-2xl max-lg:text-2xl max-ml:text-3xl leading-[43px]">
              Accelerating Innovations In Packaging
            </div>
            <div className="max-w-[535px] text-[#143761] max-xl:text-sm leading-[24px]">
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface without relying on
              meaningful content.
            </div>
          </div>
          <div className="flex flex-col gap-5 max-ml:px-[30px]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-5">
                <Image
                  src={"/homepagepkg.svg"}
                  alt="svg"
                  width={55}
                  height={55}
                />
                <div className="flex flex-col">
                  <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                    Best Quality Of Packaging
                  </div>
                  <div className="text-sm">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-5">
                <Image
                  src={"/homepagepkg.svg"}
                  alt="svg"
                  width={55}
                  height={55}
                />
                <div className="flex flex-col">
                  <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                    Best Quality Of Packaging
                  </div>
                  <div className="text-sm">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate
                  </div>
                </div>
              </div>
              <Divider />
            </div>
            <div className="flex gap-5">
              <Image
                src={"/homepagepkg.svg"}
                alt="svg"
                width={55}
                height={55}
              />
              <div className="flex flex-col">
                <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                  Best Quality Of Packaging
                </div>
                <div className="text-sm">
                  Lorem ipsum is a placeholder text commonly used to demonstrate
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-6 pb-0">
            <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-[4px] max-w-[246px] font-semibold text-base text-white">
              Customize now <GoArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 mobile:px-5 xl:px-16 xs:px-8 w-full max-w-full">
        <div className="flex justify-center xs:justify-between items-center">
          <div className="font-semibold text-[#143761] text-2xl">
            Shop by business approach
          </div>
          <div className="flex gap-2 max-xs:hidden">
            <HiOutlineArrowLeft className="text-slate-500" />
            <HiOutlineArrowRight />
          </div>
        </div>
        <div className="max-sm:flex gap-5 mobile:gap-8 grid grid-cols-4 max-md:grid-cols-3 max-sm:px-5 max-sm:overflow-x-auto max-sm:scrollbar-hide">
          {productList.map((ele, i) => {
            return (
              <Link
                href={`${ele.name
                  .toLocaleLowerCase()
                  .replace(" ", "-")}/packaging-type`}
                key={i}
                className="flex flex-col gap-2 ml:gap-5"
              >
                <Image
                  className="w-full max-w-full aspect-[296/314]"
                  src={ele.packaging_image_url}
                  alt={ele.name}
                  height={395}
                  width={296}
                  style={{ objectFit: "cover" }} // Optional: adjust as needed
                />
                <div className="flex flex-col gap-1 max-mobile:gap-3 w-full text-left">
                  <div className="font-medium max-mobile:font-medium max-lg:text-sm">
                    {ele.name}
                  </div>
                  <div className="flex justify-center items-center gap-0 bg-gray-200 px-[10px] max-ml:px-[5px] py-[5px] max-ml:py-[2px] rounded-lg lg:w-[170px] max-ml:w-[130px] font-semibold text-[#143761] max-lg:text-sm max-mobile:text-xs">
                    {ele.price}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-10 mobile:p-5 xl:p-16 xs:p-8 w-full max-w-full">
          <div className="flex justify-between items-center">
            <div className="w-full font-semibold text-[#143761] text-2xl text-center">
              Why we are best in packaging industry?
            </div>
            <div className="flex gap-2 xs:hidden">
              <HiOutlineArrowLeft className="text-slate-500" />
              <HiOutlineArrowRight />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 max-sm:gap-2 max-lg:gap-4">
            <div className="flex gap-5 max-md:gap-2 max-xs:hidden">
              <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                  <div>
                    <Image
                      src="/homepage3.svg"
                      alt="3"
                      width={489}
                      height={259}
                    />
                  </div>
                  <div>
                    <Image
                      src="/homepage4.svg"
                      alt="4"
                      width={290}
                      height={259}
                    />
                  </div>
                </div>
                <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                  <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                    <Image
                      src="/homepage5.svg"
                      alt="5"
                      width={370}
                      height={204}
                    />
                    <Image
                      src="/homepage6.svg"
                      alt="6"
                      width={370}
                      height={204}
                    />
                  </div>
                  <div>
                    <Image
                      src="/homepage7.svg"
                      alt="7"
                      width={409}
                      height={430}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4">
                <div>
                  <Image
                    src="/homepage8.svg"
                    alt="8"
                    width={415}
                    height={367}
                  />
                </div>
                <div>
                  <Image
                    src="/homepage9.svg"
                    alt="9"
                    width={415}
                    height={322}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 max-sm:gap-2 max-lg:gap-4 xs:hidden">
              <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="relative w-1/2 h-full">
                  <Image
                    src="/homepage3.svg"
                    alt="3"
                    className="rounded-[10px]"
                    layout="fill" // Use layout="fill" to make the image fill the parent
                    objectFit="cover" // Optional: to maintain aspect ratio
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/homepage4.svg"
                    alt="4"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div className="relative w-full aspect-[370/235]">
                <Image
                  src="/homepage7.svg"
                  alt="7"
                  fill
                  className="rounded-[10px]"
                  objectFit="cover" // Use "fill" to stretch the image to fit the parent
                />
              </div>
              <div className="flex gap-5 max-sm:gap-2 max-lg:gap-4">
                <div className="relative w-1/2">
                  <Image
                    src="/homepage5.svg"
                    alt="5"
                    className="rounded-[10px]"
                    layout="fill" // Use layout="fill" to make the image fill the parent
                    objectFit="cover" // Optional: to maintain aspect ratio
                  />
                </div>
                <div className="relative w-1/2">
                  <Image
                    src="/homepage6.svg"
                    alt="6"
                    width={370}
                    layout="responsive"
                    height={204}
                  />
                </div>
              </div>
              <div>
                <Image
                  src="/homepage8-1.svg"
                  alt="8"
                  width={370}
                  height={139}
                  layout="responsive"
                />
              </div>
              <div>
                <Image
                  src="/homepage9-1.svg"
                  alt="9"
                  layout="responsive"
                  width={415}
                  height={322}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10 bg-[#FFEADB] ml:px-[100px] ml:py-[70px] max-sm:p-4 sm:p-10">
          <div className="max-w-full font-semibold text-[#143761] text-[32px] text-center leading-[43px]">
            Here you will find much more than just packaging
          </div>
          <div className="w-full overflow-hidden">
            <div className="max-sm:flex gap-5 sm:gap-[30px] grid grid-cols-2 ml:grid-cols-3 overflow-x-scroll scrollbar-hide">
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 bg-white p-4 md:p-10 rounded-[10px] max-sm:min-w-[300px]">
                <Image
                  src="/fxemoji_star.svg"
                  alt="star emoji"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4">
                  <div className="font-medium text-xl">
                    Best Quality Of Packaging
                  </div>
                  <div className="">
                    Best quality packaging combines durability, functionality,
                    and aesthetics to protect products while leaving a lasting
                    impression. It reflects the brand&apos;s commitment to
                    excellence and elevates the customer experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-ml:flex-col flex-grow gap-10 w-full">
          <div className="relative ml:hidden ml:w-1/2 aspect-[706/723]">
            <Image src="/homepage2.svg" alt="2" className="rounded-none" fill />
            <div className="bottom-0 left-0 absolute flex flex-col gap-4 bg-[#143761] p-10 max-w-[376px] aspect-[376/197]">
              <div className="font-semibold text-sm text-white">
                We produce sustainable packaging for all type of businesses
              </div>
              <div className="text-[#FFFFFFBF] text-sm">
                Lorem ipsum may be used as a placeholder before the final copy
                is available.
              </div>
              <div className="flex items-center gap-4 text-[#F47A1F] text-sm">
                View reviews
                <FaArrowRightLong color="#F47A1F" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow justify-between pl-7">
            <div className="flex flex-col max-ml:items-center gap-5 max-ml:gap-3 p-[30px] pt-0">
              <div className="flex justify-center w-fit font-semibold text-[#143761] text-[32px] max-md:text-2xl max-lg:text-2xl max-ml:text-3xl leading-[43px]">
                Accelerating Innovations In Packaging
              </div>
              <div className="max-w-[535px] text-[#143761] max-xl:text-sm leading-[24px]">
                Lorem ipsum is a placeholder text commonly used to demonstrate
                the visual form of a document or a typeface without relying on
                meaningful content.
              </div>
            </div>
            <div className="flex flex-col gap-10 max-ml:px-[30px]">
              <div className="flex gap-5">
                <Image
                  src={"/homepagepkg.svg"}
                  alt="svg"
                  width={55}
                  height={55}
                />
                <div className="flex flex-col">
                  <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                    Best Quality Of Packaging
                  </div>
                  <div className="text-sm">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate
                  </div>
                </div>
              </div>
              <Divider />
              <div className="flex gap-5">
                <Image
                  src={"/homepagepkg.svg"}
                  alt="svg"
                  width={55}
                  height={55}
                />
                <div className="flex flex-col">
                  <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                    Best Quality Of Packaging
                  </div>
                  <div className="text-sm">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate
                  </div>
                </div>
              </div>
              <Divider />
              <div className="flex gap-5">
                <Image
                  src={"/homepagepkg.svg"}
                  alt="svg"
                  width={55}
                  height={55}
                />
                <div className="flex flex-col">
                  <div className="font-semibold max-md:font-medium text-xl max-md:text-base max-xl:text-lg">
                    Best Quality Of Packaging
                  </div>
                  <div className="text-sm">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center p-6 pb-0">
              <Button className="flex justify-center items-center gap-2 bg-[#143761] rounded-[4px] max-w-[246px] font-semibold text-base text-white">
                Customize now <GoArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="relative max-ml:hidden ml:w-1/2 aspect-[706/723]">
            <Image src="/homepage2.svg" alt="2" className="rounded-none" fill />
            <div className="bottom-0 left-0 absolute flex flex-col gap-4 bg-[#143761] p-10 max-w-[376px] aspect-[376/197]">
              <div className="font-semibold text-sm text-white">
                We produce sustainable packaging for all type of businesses
              </div>
              <div className="text-[#FFFFFFBF] text-sm">
                Lorem ipsum may be used as a placeholder before the final copy
                is available.
              </div>
              <div className="flex items-center gap-4 text-[#F47A1F] text-sm">
                View reviews
                <FaArrowRightLong color="#F47A1F" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-10 bg-[#F5F5F7] py-[70px]">
          <div className="flex justify-center w-fit font-semibold text-[#143761] text-[32px] text-center max-md:text-2xl max-lg:text-2xl max-ml:text-3xl leading-[43px]">
            Accelerating Innovations In Packaging
          </div>
          <div className="flex flex-wrap gap-6 p-5 max-w-[1000px]">
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="flex-1 space-y-6 min-w-[250px] md:min-w-[300px] lg:min-w-0"
              >
                {testimonials
                  .filter((_, index) => index % columns === colIndex)
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex flex-col bg-white shadow-md p-4 md:p-6 rounded-[20px] md:rounded-[30px]"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <Avatar className="w-10 md:w-14 h-10 md:h-14" />
                        <div>
                          <h3 className="font-semibold text-base md:text-lg lg:text-xl">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-500 text-sm md:text-base">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 md:mt-4 text-gray-800 text-sm md:text-base lg:text-lg">
                        {testimonial.message}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="flex justify-center items-center bg-white/72 py-16 w-full h-auto">
            {/* Background Blur */}
            <div className="top-0 left-1/2 absolute blur-[125px] w-full h-full transform -translate-x-1/2">
              {/* Vectors */}
              <div className="top-[20.23%] right-[34.59%] bottom-[50.42%] left-[35.12%] absolute bg-[rgba(10,124,255,0.43)]" />
              <div className="top-[34.84%] right-[19.7%] bottom-[50.42%] left-[51.72%] absolute bg-[rgba(10,124,255,0.43)]" />
              <div className="top-[31.69%] right-[48.28%] bottom-[50.42%] left-[18.84%] absolute bg-[#46E3FF]" />
              <div className="top-[49.58%] right-[48.28%] bottom-[28.39%] left-[18.77%] absolute bg-[#FF7847]" />
              <div className="top-[49.58%] right-[18.77%] bottom-[25.2%] left-[51.72%] absolute bg-[rgba(0,223,223,0.26)]" />
              <div className="top-[49.58%] right-[46.95%] bottom-[20.6%] left-[31.36%] absolute bg-[rgba(119,51,255,0.51)]" />
            </div>
            <div className="z-50 flex flex-col items-center gap-6 px-4 w-full">
              {/* Title */}
              <h1 className="font-bold text-3xl text-center md:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h1>

              {/* Subtitle */}
              <div className="flex flex-col items-center text-[#676D79] text-base text-center md:text-lg lg:text-xl">
                <div>
                  Everything you need to know about Anron Icons. Can&apos;t find
                  the answer you&apos;re
                </div>
                <div>
                  looking for? Feel free to{" "}
                  <span className="text-[#0A7CFF] cursor-pointer">
                    contact us
                  </span>
                </div>
              </div>

              {/* Section Title */}
              <div className="text-[#676D79] text-lg md:text-xl">
                General Questions
              </div>

              {/* Questions List */}
              <div className="relative flex flex-col items-center gap-4 w-full">
                {questions.map((ele) => (
                  <div
                    className="flex justify-between items-center bg-white shadow-lg p-3 md:p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 text-base md:text-lg"
                    key={ele}
                  >
                    {ele}{" "}
                    <span className="text-[#0A7CFF] text-xl md:text-2xl">
                      +
                    </span>
                  </div>
                ))}

                {/* Load More Button with Gradient */}
                <div
                  className="bottom-0 left-1/2 absolute w-full sm:w-3/4 lg:w-1/2 h-32 transform -translate-x-1/2 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #F5F5F7 100%)",
                  }}
                >
                  <div className="flex justify-center items-end h-full">
                    <Button
                      className="bg-white shadow px-4 md:px-6 py-2 rounded-[48px] font-medium text-sm md:text-base transition"
                      startContent={<FiPlusCircle color="#0A7CFF" size={20} />}
                    >
                      Load more
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex lg:flex-row flex-col justify-between items-center bg-[#143761] px-6 md:px-12 lg:px-32 py-10">
          {/* Left Section - Text & Buttons */}
          <div className="relative z-10 flex flex-col gap-5 font-bold text-white text-xl sm:text-center sm:text-3xl md:text-4xl lg:text-left lg:text-[49px] leading-tight md:leading-[57px]">
            <div>
              <span className="text-[#A0C2FF]">Ready to build your</span>
              <br />
              <span className="text-[#A0C2FF]">company&apos;s</span> dream
              packaging?
            </div>

            {/* Buttons */}
            <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4">
              <Button
                variant="bordered"
                className="flex items-center gap-3 px-4 py-2 border rounded-md text-lg text-white"
              >
                Customize now
                <GoArrowUpRight />
              </Button>
              <Button
                variant="bordered"
                className="flex items-center gap-3 px-4 py-2 border rounded-md text-lg text-white"
              >
                Get sample products
              </Button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative mt-6 lg:mt-0 w-full lg:w-1/2">
            <div className="relative shadow-black/5 shadow-none rounded-lg">
              <Image
                src="/homepage10.svg"
                alt="Packaging Design"
                width={708}
                height={346}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F3F5F7] text-[#143761]">
          <div className="flex sm:flex-row max-sm:flex-col justify-between gap-10 lg:px-[100px] p-6 md:p-10 pb-10">
            {/* Column 1: Products */}
            <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-auto">
              <div className="font-semibold text-lg md:text-xl">Products</div>
              <div className="flex flex-col gap-4 text-gray-700">
                <div>Packiq</div>
                <div>Terms and Conditions</div>
                <div>Return Policy</div>
                <div>Contact Us</div>
                <div>Bulk Order</div>
              </div>
            </div>

            {/* Column 2: Industries */}
            <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-auto">
              <div className="font-semibold text-lg md:text-xl">Industries</div>
              <div className="flex flex-col gap-4 text-gray-700">
                <div>My Orders</div>
                <div>Track Orders</div>
                <div>My Profile</div>
              </div>
            </div>

            {/* Column 3: About Us */}
            <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-auto">
              <div className="font-semibold text-lg md:text-xl">About Us</div>
              <div className="flex flex-col gap-4 text-gray-700">
                <div>About Packiq</div>
                <div>Terms and Conditions</div>
                <div>Return Policy</div>
                <div>FAQ</div>
                <div>Blogs</div>
              </div>
            </div>

            {/* Column 4: My Account */}
            <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-auto">
              <div className="font-semibold text-lg md:text-xl">My Account</div>
              <div className="flex flex-col gap-4 text-gray-700">
                <div>My Orders</div>
                <div>Track Orders</div>
                <div>My Profile</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-sm:flex-col justify-between max-sm:gap-5 bg-[#F3F5F7] lg:px-[100px] py-5 p-6">
          <Image
            src="/productNavLogo.png"
            alt="Logo"
            height={52}
            width={87.5}
          />
          <span className="sm:hidden text-[#143761]">Copyright 2024</span>
          <div className="flex max-sm:flex-col sm:items-center gap-6">
            <span className="max-sm:hidden text-[#143761]">Copyright 2024</span>
            <FaFacebookF color="#10101080" />
            <FaInstagram color="#10101080" />
            <FaLinkedinIn color="#10101080" />
            <FaXTwitter color="#10101080" />
          </div>
        </div>
      </div>
    </div>
  );
}
