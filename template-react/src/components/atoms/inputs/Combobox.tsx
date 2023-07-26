import { Combobox as HCombobox, Transition } from "@headlessui/react";
import * as React from "react";
import { FC, Fragment, useState } from "react";
import { getIconComp } from "@/constants/svgIcons";

interface ComboboxProps {
  className?: string;
  items: {
    id: number;
    name: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

const Combobox: FC<ComboboxProps> = ({ items, value, onChange }) => {
  const selectedItem = items.find((item) => item.name === value);
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const ChevronUpDownIcon = getIconComp("CHEVRON_UP_DOWN");
  const CheckIcon = getIconComp("CHECK");
  return (
    <HCombobox value={selectedItem} onChange={(e) => e && onChange(e.name)}>
      <div className="relative mt-1 text-gray-50 ">
        <div className="relative w-full cursor-text overflow-hidden rounded-lg text-left shadow-md">
          <HCombobox.Input
            className="w-full bg-gray-400 text-center border-none py-2 px-3 text-sm leading-5"
            // @ts-expect-error
            displayValue={(item) => item?.name || ""}
            onChange={(event) => setQuery(event.target.value)}
          />
          <HCombobox.Button className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-50" aria-hidden="true" />
          </HCombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <HCombobox.Options className="absolute z-dropDown mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-400 py-1 shadow-lg">
            {filteredItems.map((person) => (
              <HCombobox.Option
                key={person.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary-500 text-white" : "text-gray-50"
                  }`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person.name}</span>
                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-gray-50"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </HCombobox.Option>
            ))}
          </HCombobox.Options>
        </Transition>
      </div>
    </HCombobox>
  );
};

export default Combobox;
