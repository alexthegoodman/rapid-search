import * as React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

import { SearchInputProps } from "./SearchInput.d";

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch = (data) => console.info("Search..."),
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => onSearch(data);
  const onError = (error) => console.error(error);

  return (
    <section className="searchForm">
      <div className="searchFormInner">
        <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <FormInput
            type="search"
            name="search"
            placeholder="Search web..."
            register={register}
            errors={errors}
            validation={{ required: false }}
          />
          <input className="searchButton" type="submit" value="Search Web" />
        </form>
      </div>
    </section>
  );
};

export default SearchInput;
