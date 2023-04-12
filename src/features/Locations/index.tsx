import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "../../components/Modal";

import { AddressForm, AddressTable } from "./Address";
import { LocationForm, LocationTable } from "./Location";
import { SuburbForm, SuburbTable } from "./Suburb";

const Tab = ({ name, onClick, activeTab }) => (
  <button
    className={`flex-1 p-2 uppercase text-sm font-semibold rounded-t-lg transition-colors duration-150 ease-in-out ${
      activeTab === name
        ? "bg-blue-500 text-white shadow-md"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
    }`}
    onClick={() => onClick(name)}
  >
    {name}
  </button>
);

const Content: Record<
  string,
  { table: () => JSX.Element; form: typeof SuburbForm }
> = {
  suburbs: { table: SuburbTable, form: SuburbForm },
  locations: { table: LocationTable, form: LocationForm },
  addresses: { table: AddressTable, form: AddressForm },
};

const LocationsPage = () => {
  const [activeTab, setActiveTab] = useState("suburbs");
  const [modalVisible, setModalVisible] = useState(false);

  const handleTabChange = (key: string) => setActiveTab(key);
  const handleModalClose = () => setModalVisible(false);

  const TabContent = Content[activeTab].table;
  const FormContent = Content[activeTab].form;

  const [formData, setFormData] = useState({});

  const handleChange = (key: string, value: string) =>
    setFormData((oldFormData) => ({ ...oldFormData, [key]: value }));

  return (
    <div>
      <div className="flex justify-between">
        <Tab name="suburbs" onClick={handleTabChange} activeTab={activeTab} />
        <Tab name="locations" onClick={handleTabChange} activeTab={activeTab} />
        <Tab name="addresses" onClick={handleTabChange} activeTab={activeTab} />
      </div>

      <div>
        <TabContent />
      </div>

      {modalVisible && (
        <Modal
          title={`Add ${activeTab}`}
          onClose={handleModalClose}
          onNext={handleModalClose}
          onPrevious={null}
        >
          <FormContent formData={formData} handleChange={handleChange} />
        </Modal>
      )}

      <button
        className="fixed right-4 bottom-20 bg-blue-500 text-white p-4 rounded-full"
        onClick={() => setModalVisible(true)}
      >
        <FiPlus size="24px" />
      </button>
    </div>
  );
};

export default LocationsPage;
