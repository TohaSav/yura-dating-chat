import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface LookingForSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const lookingForOptions = [
  "Серьёзные отношения",
  "Просто общение",
  "Флирт",
  "Не чего не ищу",
  "Прогулки",
  "Провести хорошо время",
];

export default function LookingForSelector({
  value,
  onChange,
  disabled = false,
}: LookingForSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Search" size={20} className="mr-2" />
          Что ищет
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Не указано" />
          </SelectTrigger>
          <SelectContent>
            {lookingForOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
