

const TodosLoading = () => {
  return (
    <>
      <li
        className={`shadow rounded-5 py-4 px-3 d-flex justify-content-around align-items-center w-100 placeholder-glow`}
      >
        <div className="w-25 d-flex -justify-content-start">
          <div
            className="placeholder p-3 rounded-5"
          />
        </div>

        <div className="w-50 d-flex-justify-content-center">

        </div>

        <div className={`justify-content-end d-flex gap-1 gap-md-3 w-25`}>
          <div className={`p-3 placeholder rounded-5`}/>
          <div className="p-3 placeholder rounded-5"/>
        </div>
      </li>
    </>
  );
};

export { TodosLoading };
