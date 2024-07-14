<?php

namespace App\OpenApi;

use Dedoc\Scramble\Extensions\TypeToSchemaExtension;
use Dedoc\Scramble\Support\Generator\Response;
use Dedoc\Scramble\Support\Generator\Schema;
use Dedoc\Scramble\Support\Generator\Types\ArrayType;
use Dedoc\Scramble\Support\Generator\Types\IntegerType;
use Dedoc\Scramble\Support\Generator\Types\ObjectType as OpenApiObjectType;
use Dedoc\Scramble\Support\Generator\Types\StringType;
use Dedoc\Scramble\Support\Type\Generic;
use Dedoc\Scramble\Support\Type\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;

class SimplePaginationExtension extends TypeToSchemaExtension
{
    public function shouldHandle(Type $type): bool
    {
        if (! ($type instanceof Generic)) {
            return false;
        }

        return $type->name === Paginator::class;
    }

    public function toResponse(Type $type): Response
    {
        $collectingClassType = $type->templateTypes[0];

        if (! $collectingClassType->isInstanceOf(JsonResource::class) && ! $collectingClassType->isInstanceOf(Model::class)) {
            return null;
        }

        if (! ($collectingType = $this->openApiTransformer->transform($collectingClassType))) {
            return null;
        }

        $type = new OpenApiObjectType;
        $type->addProperty('current_page', new IntegerType);
        $type->addProperty('data', (new ArrayType())->setItems($collectingType));
        $type->addProperty('first_page_url', (new StringType)->nullable(true));
        $type->addProperty('from', (new IntegerType)->nullable(true));
        $type->addProperty('next_page_url', (new StringType)->nullable(true));
        $type->addProperty('path', (new StringType)->nullable(true)->setDescription('Base path for paginator generated URLs.'));
        $type->addProperty('prev_page_url', (new StringType)->nullable(true));
        $type->addProperty('to', (new IntegerType)->nullable(true)->setDescription('Number of the last item in the slice.'));
        $type->addProperty('per_page', (new IntegerType)->setDescription('Number of items shown per page.'));

        $type->setRequired(['data', 'current_page', 'first_page_url', 'path', 'per_page', 'from', 'to']);

        Log::info('schema', [Schema::fromType($type)]);

        return Response::make(200)
            ->description('Simple paginated set of `' . $this->components->uniqueSchemaName($collectingClassType->name) . '`')
            ->setContent('application/json', Schema::fromType($type));
    }
}
