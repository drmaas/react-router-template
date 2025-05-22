// Copyright 2025 Daniel Maas
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { data } from 'react-router';
import { Route } from '../routes/+types/sample-action';

export interface SampleActionResponse {
    message?: string;
    error?: string;
}

export const sampleAction = async ({
    request,
}: Route.ActionArgs) => {
    console.log('post url: ', request.url);
    try {
        return data(
            { message: 'Sample action complete!' },
            { status: 201 }
        );
    } catch (error) {
        return data({ error: (error as Error).message }, { status: 400 });
    }
}