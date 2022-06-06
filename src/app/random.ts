interface requestOptions {
    method: string;
    redirect: string;
    countriesData: object[];
  }
  
  const requestOptions: object = {
    method: 'GET',
    redirect: 'follow'
  };
  
  let countryList: any[] = [];
  
  let getCountries = async () => {
    await fetch('https://countriesnow.space/api/v0.1/countries', requestOptions).then(response => response.json())
    .then(data => {
      data.data.forEach((country:any) => {
        countryList.push(country);
      })
    })
    .catch(error => console.log(error))
  }
  
  getCountries();
  