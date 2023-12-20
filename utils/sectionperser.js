const bodyParser = (body) => {
  function mave_data(body, type, value) {
    let result;
    let _key = `${type}s_mave`;
    result = body[_key]?.find((o) => o.id == value);
    return result;
  }

  function itterate(element) {
    return element.data?.map((child_element) => {
      if (
        child_element.hasOwnProperty("_category") &&
        child_element._category == "root"
      ) {
        return {
          ...child_element,
          data: itterate(child_element),
        };
      } else {
        if (child_element.hasOwnProperty("id")) {
          return {
            ...child_element,
            _mave: mave_data(body, child_element.type, child_element?.id),
          };
        } else {
          return {
            ...child_element,
          };
        }
      }
    });
  }

  const modifiedData = body?.body?.map((element) => {
    return {
      ...element,
      data: itterate(element),
    };
  });

  return modifiedData;
};
export default bodyParser;
