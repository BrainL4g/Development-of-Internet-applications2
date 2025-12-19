# backend/commands.py
import typer
from sqlalchemy.orm import Session
from db.database import SessionLocal
from schemas.product import ProductCreate, ProductUpdate
from services.product_service import ProductService

app = typer.Typer(help="Консольные команды для управления продуктами магазина")

@app.command()
def list_products():
    """Вывести список всех продуктов."""
    with SessionLocal() as db:
        products = ProductService.get_product_list(db)
        if not products:
            typer.echo("Нет продуктов в магазине.")
        else:
            typer.echo("Список продуктов:")
            for product in products:
                typer.echo(f"  ID: {product.id}")
                typer.echo(f"  Название: {product.name}")
                typer.echo(f"  Цена: {product.price} ₽")
                if product.description:
                    typer.echo(f"  Описание: {product.description}")
                typer.echo("---")

@app.command()
def create_product():
    """Создать новый продукт."""
    name = typer.prompt("Название продукта")
    description = typer.prompt("Описание (можно оставить пустым)", default="", show_default=False)
    while True:
        price_str = typer.prompt("Цена (руб.)")
        try:
            price = float(price_str)
            if price <= 0:
                typer.echo("Ошибка: цена должна быть больше 0")
                continue
            break
        except ValueError:
            typer.echo("Ошибка: введите корректное число")

    with SessionLocal() as db:
        product_data = ProductCreate(name=name, description=description or None, price=price)
        created = ProductService.create_product(db, product_data)
        typer.echo(f"Продукт успешно создан! ID: {created.id}")

@app.command()
def show_product(product_id: int):
    """Показать информацию о продукте по ID."""
    with SessionLocal() as db:
        product = ProductService.get_product_by_id(db, product_id)
        if not product:
            typer.echo(f"Продукт с ID {product_id} не найден.")
        else:
            typer.echo(f"Информация о продукте ID {product.id}:")
            typer.echo(f"  Название: {product.name}")
            typer.echo(f"  Цена: {product.price} ₽")
            if product.description:
                typer.echo(f"  Описание: {product.description}")

@app.command()
def update_product(
    product_id: int,
    name: str = typer.Option(None, "--name", help="Новое название"),
    description: str = typer.Option(None, "--description", help="Новое описание"),
    price: float = typer.Option(None, "--price", help="Новая цена")
):
    """Обновить продукт по ID."""
    if name is None and description is None and price is None:
        typer.echo("Ошибка: укажите хотя бы одно поле для обновления (--name, --description или --price)")
        raise typer.Exit(code=1)

    if price is not None and price <= 0:
        typer.echo("Ошибка: цена должна быть больше 0")
        raise typer.Exit(code=1)

    with SessionLocal() as db:
        update_data = ProductUpdate(name=name, description=description, price=price)
        updated = ProductService.update_product(db, product_id, update_data)
        if not updated:
            typer.echo(f"Продукт с ID {product_id} не найден.")
        else:
            typer.echo(f"Продукт ID {product_id} успешно обновлён.")

@app.command()
def delete_product(product_id: int):
    """Удалить продукт по ID."""
    if typer.confirm(f"Вы уверены, что хотите удалить продукт с ID {product_id}?"):
        with SessionLocal() as db:
            success = ProductService.delete_product(db, product_id)
            if success:
                typer.echo(f"Продукт ID {product_id} удалён.")
            else:
                typer.echo(f"Продукт с ID {product_id} не найден.")
    else:
        typer.echo("Удаление отменено.")

if __name__ == "__main__":
    app()