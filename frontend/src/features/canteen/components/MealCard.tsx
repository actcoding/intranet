import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {CircleMinusIcon, PencilIcon} from 'lucide-react'
import Link from 'next/link'

interface MealCardProps {
    meal: any;
}

const MealCard = ({meal}: MealCardProps) => {
    return (
        <Card className="flex">
            <div className="flex flex-1 flex-col">
                <CardHeader className="flex-1">
                    <CardTitle>{meal.name}</CardTitle>
                    <Badge className="self-start">{meal.type}</Badge>
                    <CardDescription>{meal.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-x-1 space-y-2">
                    {meal.notes.map((note: any, index: number) => (
                        <Badge key={index} variant="outline">{note.name}</Badge>
                    ))}
                </CardContent>
                <CardFooter className="gap-2">
                    <Button asChild variant="outline" className="flex-1">
                        <Link href={`/manage/canteen/meals/${meal.id}`}>
                            <PencilIcon size={16} className="mr-2"/>
                            Bearbeiten
                        </Link>
                    </Button>
                    <Button variant="destructive" size="icon">
                        <CircleMinusIcon size={16}/>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export { MealCard }
