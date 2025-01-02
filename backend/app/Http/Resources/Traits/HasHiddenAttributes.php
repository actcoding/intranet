<?php

namespace App\Http\Resources\Traits;

trait HasHiddenAttributes
{
    protected array $hiddenAttributes = [];

    public function withHidden(string $attribute): self
    {
        $this->hiddenAttributes[] = $attribute;

        return $this;
    }

    public function whenVisible(string $attribute)
    {
        return $this->when(! in_array($attribute, $this->hiddenAttributes), fn () => $this->resource->{$attribute});
    }
}
