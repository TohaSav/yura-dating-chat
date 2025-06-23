import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/feed");
      } else {
        alert("Неверный email или пароль");
      }
    } catch (error) {
      alert("Ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Добро пожаловать! 💕
          </h1>
          <p className="text-gray-600">Войдите в свой аккаунт</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-purple-600 hover:underline text-sm"
            >
              Забыли пароль?
            </Link>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="my-6 text-center text-gray-500">
          <div className="flex items-center">
            <hr className="flex-1" />
            <span className="px-4">или</span>
            <hr className="flex-1" />
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <Icon name="Mail" className="mr-2" size={20} />
            Войти через Google
          </Button>
          <Button variant="outline" className="w-full">
            <Icon name="Phone" className="mr-2" size={20} />
            Войти через телефон
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="text-purple-600 hover:underline font-semibold"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
