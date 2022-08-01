import React, { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import UserBlackIcon from "../../static/image/User.svg";
import GuestCounter from "./GuestCounter";
import { useRecoilState } from "recoil";
import { AdultNumber, ChildrenNumber } from "store/search";
import { useEffect } from "@storybook/addons";

interface GuestProps {}

const maxPeople = 8;

const GuestInput = () => {
  const [adultNum, setAdultNum] = useRecoilState(AdultNumber);
  const [childrenNum, setChildrenNum] = useRecoilState(ChildrenNumber);
  const peopleNum = Math.floor(adultNum + childrenNum);
  const [open, setOpen] = useState(false);
  const guestRef = useRef<any>();

  const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
  };

  const onClickCounter = (counter: string, people: string) => {
    switch (counter) {
      case "plus":
        if (people === "adult" && adultNum !== maxPeople) {
          setAdultNum(adultNum + 1);
        } else if (people === "children" && childrenNum !== maxPeople) {
          setChildrenNum(childrenNum + 1);
        }
        break;
      case "minus":
        if (people === "adult" && adultNum !== 0) {
          setAdultNum(adultNum - 1);
        } else if (people === "children" && childrenNum !== 0) {
          setChildrenNum(childrenNum - 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <GuestBox>
      <img src={UserBlackIcon} className="ml-4 w-6 h-6" alt="" />
      <div
        className="flex flex-row item-center pl-4 w-1/2 h-full"
        onClick={onClickOpen}
      >
        <div className="self-center">
          <span className="block text-xs text-slate-400">인원</span>
          <input type="hidden" value={peopleNum} />
          <strong>인원 {peopleNum}</strong>
        </div>
      </div>
      {open && (
        <GuestNumberBox ref={guestRef}>
          <div className="pt-4">
            <strong className="block pb-2 border-b">인원</strong>
            <div className="pb-6">
              <GuestCounter
                title="성인"
                people="adult"
                value={adultNum}
                onClick={onClickCounter}
              />
              <GuestCounter
                title="아동"
                people="children"
                value={childrenNum}
                onClick={onClickCounter}
              />
            </div>
          </div>
        </GuestNumberBox>
      )}
    </GuestBox>
  );
};

export default GuestInput;

const GuestBox = tw.div`
flex flex-row items-center w-1/4 relative h-full bg-white transition-all  cursor-pointer hover:bg-gray-100`;

const GuestNumberBox = tw.div`
absolute top-18 right-0 px-5 w-80 bg-white shadow-lg rounded`;