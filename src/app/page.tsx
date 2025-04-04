"use client";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Delete, PlusCircle } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

interface ProdutoPros {
  id: number;
  name: string;
  quantidade: number;
}

type Inputs = {
  name: string;
  price: number;
  quantidade: number;
  produto?: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [Produto, SetProdutos] = useState<ProdutoPros[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<ProdutoPros[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newProduct: ProdutoPros = {
      id: Produto.length + 1,
      name: data.name,
      quantidade: data.quantidade,
    };
    SetProdutos([...Produto, newProduct]);
    reset();
    console.log(data);
  };

  const handleDelete = (id: number) => {
    const updatedProdutos = Produto.filter((produto) => produto.id !== id);
    SetProdutos(updatedProdutos);

    //atualizar a lista apois a exlcusao

    const afterDelete = filteredProduct.filter((prod) => prod.id !== id);
    setFilteredProduct(afterDelete);

    if (afterDelete.length === 0) {
      setFilteredProduct([]);
      reset();
    }
  };

  const handleSearch = (produto: string) => {
    console.log(produto);
    if (produto.trim() === "") {
      setFilteredProduct([]);
    }

    const produtFiltered = Produto.filter((prod) =>
      prod.name.toLocaleLowerCase().includes(produto.toLocaleLowerCase())
    );

    setFilteredProduct(produtFiltered);
  };

  return (
    <div className="mx-auto p-6 max-w-2xl space-y-2 ">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl">Listas de Compras</h1>
        <form>
          <Input
            type="text"
            placeholder="buscar..."
            {...register("produto")}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Produtos
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
            </DialogHeader>

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <Label htmlFor="name">Nome:</Label>
                <Input
                  type="text"
                  placeholder="Nome do Produto"
                  id="name"
                  {...register("name")}
                />
              </div>
              <div className="flex gap-4">
                <Label htmlFor="price">Quantidade:</Label>
                <Input
                  type="text"
                  placeholder="Quantidade de produtos"
                  id="price"
                  {...register("quantidade", { valueAsNumber: true })}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" variant={"link"}>
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Enviar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-2xl">
        <Table>
          <TableHeader>
            <TableHead>Ordem Lista</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-center">Quantidades</TableHead>
          </TableHeader>
          <TableBody>
            {filteredProduct.length === 0
              ? Produto.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.id}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell className="text-center">
                      {e.quantidade}
                    </TableCell>
                    <div className="flex my-3 gap-2 justify-center items-center">
                      <Delete
                        size={16}
                        color="red"
                        onClick={() => handleDelete(e.id)}
                      />
                    </div>
                  </TableRow>
                ))
              : filteredProduct.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.id}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell className="text-center">
                      {e.quantidade}
                    </TableCell>
                    <div className="flex my-3 gap-2 justify-center items-center">
                      <Delete
                        size={16}
                        color="red"
                        onClick={() => handleDelete(e.id)}
                      />
                    </div>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
