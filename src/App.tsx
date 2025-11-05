import QueryConsultor from './components/QueryConsultor'
import Layout from './layouts/Layout'

function App() {
  return (
    <>
      <Layout>
        <QueryConsultor
          queryNum={1}
          queryTitle='Muesta los primeros 5 barcos?'
          queryProp='SELECT DISTINCT ShipName FROM Orders LIMIT 5;'
        />
        <QueryConsultor
          queryNum={2}
          queryTitle='¿Cuál es el sumatorio de precios de los productos del barco "Hanari Carnes"?'
          queryProp='SELECT ROUND(SUM(UnitPrice), 2) FROM "Order Details" LEFT JOIN Orders ON "Order Details".OrderID = Orders.OrderID WHERE ShipName="Hanari Carnes";'
        />
        <QueryConsultor
          queryNum={3}
          queryTitle='¿Devuelve el nombre y apellido en una sola columna llamada "FullName" de las empleados que su apellido empieza por "D" de aquellos barcos franceses?'
          queryProp='SELECT DISTINCT(FirstName || " " || LastName) AS FullName FROM Employees LEFT JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID WHERE SUBSTR(LastName, 1, 1) = "D" AND ShipCountry = "France";'
        />
        <QueryConsultor
          queryNum={4}
          queryTitle='Los empleados provienen de 4 regiones (Northern, Southern, Western, Eastern). ¿Cuál es el número de empleados de cada región?'
          queryProp='SELECT Regions.RegionDescription, COUNT(DISTINCT Employees.EmployeeID) as Contador FROM Employees LEFT JOIN EmployeeTerritories ON Employees.EmployeeID = EmployeeTerritories.EmployeeID LEFT JOIN Territories ON EmployeeTerritories.TerritoryID = Territories.TerritoryID LEFT JOIN Regions ON Territories.RegionID = Regions.RegionID GROUP BY Regions.RegionDescription;'
        />
        <QueryConsultor
          queryNum={5}
          queryTitle='Indica el promedio de stock y de precio que tiene cada categoría de producto'
          queryProp='SELECT CategoryName, ROUND(AVG(UnitsInStock),2) AS StockPromedio, round(AVG(UnitPrice), 2) AS PrecioPromedio FROM Categories LEFT JOIN Products ON Categories.CategoryID = Products.CategoryID GROUP BY CategoryName;'
        />
        <QueryConsultor
          queryNum={6}
          queryTitle='¿Cuál es el país que tiene la extensión de teléfono "514"?'
          queryProp='SELECT DISTINCT Country FROM Suppliers WHERE Phone LIKE "%(514)%";'
        />
        <QueryConsultor
          queryNum={7}
          queryTitle='¿Qué shippers hay? ¿De qué país son? Averigualo a través de la extensión de teléfono de cada uno de ellos que puedes encontrar el país en la tabla "Customers".'
          queryProp='SELECT DISTINCT Shippers.CompanyName, Customers.Country FROM Shippers LEFT JOIN Orders ON Shippers.ShipperID = Orders.ShipVia LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID WHERE SUBSTR( Shippers.Phone, INSTR(Shippers.Phone, "(") + 1, INSTR(Shippers.Phone, ")") - INSTR(Shippers.Phone, "(") - 1) = SUBSTR( Customers.Phone, INSTR(Customers.Phone, "(") + 1, INSTR(Customers.Phone, ")") - INSTR(Customers.Phone, "(") - 1 ) ORDER BY Shippers.CompanyName; '
        />
      </Layout>
    </>
  )
}

export default App
