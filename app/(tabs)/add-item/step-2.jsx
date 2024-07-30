import { View, Text } from "react-native";
import React from "react";

import Dropdown from "../../../components/CustomForm/Dropdown";

const Step2 = () => {
  return (
    <View>
      <Dropdown 
        title="Tag"
        value={form.tags}
        handleChangeValue={(value) => {
          handleFormError(null, "tags");
          setForm({ ...form, tags: value });
        }}
        items={tagOptions}
        containerStyles="mt-5"
        placeholder="Select Tags to apply to item"
        open={tagDropdownOpen}
        setOpen={setTagDropdownOpen}
        onOpen={onTagDropdownOpen}
        multiple={true}
        min={0}
        max={tagOptions.length}
        mode="BADGE"
      />
    </View>
  )
};

export default Step2;