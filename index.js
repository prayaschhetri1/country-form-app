const form = document.querySelector(".form");

const formData = (e) => {
  e.preventDefault();
  let country = document.getElementById("country").value;
  let city = document.getElementById("city").value;
  let population = document.getElementById("population").value;
  const formData = { country, city, population };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(formData),
  };

  let fetchData = fetch(
    "https://city-country-database.herokuapp.com/countries",
    options
  );
  fetchData
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .then(() => {
      getData();
    })
    .catch((e) => {
      console.log(e);
    });
};
let data;
const getData = async () => {
  try {
    let res = await fetch(
      `https://city-country-database.herokuapp.com/countries`
    );
    data = await res.json();
    mapData(data);
  } catch (e) {
    console.log(e);
  }
};

getData();

// Delte Functionality;

const deleteFunc = (id) => {
  let arr = data.filter((item) => {
    return item.id != id;
  });

  deletePost(id);
};

const deletePost = async (value) => {
  await fetch(`https://city-country-database.herokuapp.com/countries/${value}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  getData();
};

const tbody = document.getElementById("tbody");

// Sort By Population
const sortByPopulation = document.getElementById("populationSort");
const filterFunc = (e) => {
  if (e.target.value === "htl") {
    data.sort((a, b) => {
      return b.population - a.population;
    });
    mapData(data);
  } else {
    data.sort((a, b) => {
      return a.population - b.population;
    });
    mapData(data);
  }
};

sortByPopulation.addEventListener("change", filterFunc);
// Filter by Country
const countryData = document.getElementById("filterCountry");

const filterCountryFun = (e) => {
  let value = e.target.value;
  // console.log("value")
  const newArr = data.filter((item) => {
    return item.country === value;
  });
  mapData(newArr);
};

countryData.addEventListener("change", filterCountryFun);

// Edit a particular row of countries
let toggling = document.querySelector(".toggling");
const editForm = document.getElementById("udateForm");

const editFunc = (item) => {
  
};

const mapData = (data) => {
  tbody.innerHTML = null;
  data?.map((item) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    deleteBtn.classList = "dltBtn";
    deleteBtn.addEventListener("click", function () {
      deleteFunc(item.id);
    });
    editBtn.addEventListener("click", function () {
      editFunc(item);
    });
    td1.innerText = item.id;
    td2.innerText = item.country;
    td3.innerText = item.city;
    td4.innerText = item.population;
    td5.append(editBtn);
    td6.append(deleteBtn);
    tr.append(td1, td2, td3, td4, td5, td6);
    tbody.append(tr);
  });
};

form.addEventListener("submit", formData);
