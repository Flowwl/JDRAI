import * as React from "react";
import { FC } from "react";
import { AddButton, Dropdown, IconHeaderButton } from "@/components/atoms/actions";
import { SearchBar } from "@/components/atoms/inputs";
import { HeaderDisclosure, PanelRow, PanelTab, RowDisclosure } from "@/components/atoms/panels";
import { PanelTabHeader } from "@/components/molecules";

const ComponentsView: FC = () => {
  return (
    <div className="px-10 flex flex-col gap-3">
      <h1>Component View</h1>
      <section className="flex gap-3">
        Add Button sm <AddButton size="sm"/>
        md <AddButton size="md"/>
      </section>
      <section className="flex gap-3">
        Search Bar
        <SearchBar/>
      </section>
      <section className="flex gap-3">
        Header Disclosure
        <HeaderDisclosure label="Header Disclosure">Hi I&apos;m the body</HeaderDisclosure>
      </section>
      <section className="flex gap-3">
        Panel Icon Row
        <PanelRow className="bg-gray-800 w-auto">Test</PanelRow>
        <PanelRow className="bg-gray-800 w-auto" selected>
          Test Selected
        </PanelRow>
      </section>

      <section className="flex gap-3">
        Row Disclosure
        <RowDisclosure icon="SEND" label="Row Disclosure" className="bg-gray-800 w-auto">
          <PanelRow>Test</PanelRow>
        </RowDisclosure>
        <RowDisclosure icon="SAVE" label="Row Disclosure" className="bg-gray-800 w-auto" selected>
          <PanelRow>Test </PanelRow>
        </RowDisclosure>
      </section>
      <section className="flex gap-3">
        Panel Tab
        <PanelTab icon="SEND" label="Row Disclosure" className="bg-gray-800 w-full">
          <PanelTabHeader
            onSearch={() => {
              return;
            }}
          >
            <PanelRow>Test </PanelRow>
          </PanelTabHeader>
        </PanelTab>
      </section>
      <section className="flex gap-3">
        IconHeaderButton
        <IconHeaderButton icon="BLUEPRINT" label="Reading" className="bg-gray-800"/>
      </section>
      <section className="flex gap-3">
        Dropdown
        <Dropdown
          items={[
            {
              label: "home",
              onClick() {
                console.log("go to home");
              }
            },
            {
              label: "about",
              onClick() {
                console.log("go to about");
              }
            }
          ]}
        >
          Open Dropdown
        </Dropdown>
      </section>
    </div>
  );
};

export default ComponentsView;
