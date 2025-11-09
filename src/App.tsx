import QueryConsultor from './components/QueryConsultor'
import Layout from './layouts/Layout'

function App() {
  return (
    <>
      <Layout>
        <QueryConsultor
          queryNum={1}
          queryTitle='Muestra los nombres de los primeros 5 barcos utilizados en los pedidos'
          queryProp='SELECT DISTINCT ShipName FROM Orders LIMIT 5;'
        />
        <QueryConsultor
          queryNum={2}
          queryTitle='Calcula el total de precios de los productos enviados en el barco "Hanari Carnes"'
          queryProp='SELECT ROUND(SUM(UnitPrice), 2) FROM "Order Details" LEFT JOIN Orders ON "Order Details".OrderID = Orders.OrderID WHERE ShipName="Hanari Carnes";'
        />
        <QueryConsultor
          queryNum={3}
          queryTitle='Muestra el nombre completo ("FullName") de los empleados cuyo apellido empieza por "D" y que realizaron pedidos enviados a Francia'
          queryProp='SELECT DISTINCT(FirstName || " " || LastName) AS FullName FROM Employees LEFT JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID WHERE SUBSTR(LastName, 1, 1) = "D" AND ShipCountry = "France";'
        />
        <QueryConsultor
          queryNum={4}
          queryTitle='Muestra el número de empleados que pertenecen a cada región (Northern, Southern, Western, Eastern)'
          queryProp='SELECT Regions.RegionDescription, COUNT(DISTINCT Employees.EmployeeID) as Contador FROM Employees LEFT JOIN EmployeeTerritories ON Employees.EmployeeID = EmployeeTerritories.EmployeeID LEFT JOIN Territories ON EmployeeTerritories.TerritoryID = Territories.TerritoryID LEFT JOIN Regions ON Territories.RegionID = Regions.RegionID GROUP BY Regions.RegionDescription;'
        />
        <QueryConsultor
          queryNum={5}
          queryTitle='Muestra el promedio de stock y el promedio de precio de los productos agrupados por categoría'
          queryProp='SELECT CategoryName, ROUND(AVG(UnitsInStock),2) AS StockPromedio, round(AVG(UnitPrice), 2) AS PrecioPromedio FROM Categories LEFT JOIN Products ON Categories.CategoryID = Products.CategoryID GROUP BY CategoryName;'
        />
        <QueryConsultor
          queryNum={6}
          queryTitle='Muestra el país de los proveedores cuya extensión telefónica es "514"'
          queryProp='SELECT DISTINCT Country FROM Suppliers WHERE Phone LIKE "%(514)%";'
        />
        <QueryConsultor
          queryNum={7}
          queryTitle='Muestra los transportistas ("shippers") y el país asociado a su extensión telefónica, utilizando la información de los clientes'
          queryProp='SELECT DISTINCT Shippers.CompanyName, Customers.Country FROM Shippers LEFT JOIN Orders ON Shippers.ShipperID = Orders.ShipVia LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID WHERE SUBSTR( Shippers.Phone, INSTR(Shippers.Phone, "(") + 1, INSTR(Shippers.Phone, ")") - INSTR(Shippers.Phone, "(") - 1) = SUBSTR( Customers.Phone, INSTR(Customers.Phone, "(") + 1, INSTR(Customers.Phone, ")") - INSTR(Customers.Phone, "(") - 1 ) ORDER BY Shippers.CompanyName; '
        />
      </Layout>
    </>
  )
}

export default App
