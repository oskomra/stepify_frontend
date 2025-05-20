import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProductInfo({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4 mb-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  type="text"
                  placeholder="Brand Name"
                  defaultValue={product.brandName}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="modelName">Model Name</Label>
                <Input
                  id="modelName"
                  type="text"
                  placeholder="Model Name"
                  defaultValue={product.modelName}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Category"
                  defaultValue={product.category}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  type="text"
                  placeholder="Gender"
                  defaultValue={product.gender}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
