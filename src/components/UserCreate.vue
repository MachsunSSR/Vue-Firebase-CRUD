<template>
    <div class="card card-body mt-4">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Nama</label>
                <input v-model="form.nama" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Nim</label>
                <input v-model="form.nim" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Prodi</label>
                <input v-model="form.prodi" class="form-control" required />
            </div>

            <div class="form-group mt-3">
                <label>Email</label>
                <input
                    v-model="form.email"
                    class="form-control"
                    type="email"
                    required
                />
            </div>

            <button type="submit" class="btn btn-success mt-3">
                Create User
            </button>
        </form>
    </div>
</template>

<script>
import { createUser } from "@/firebase";
import { reactive } from "vue";
export default {
    setup() {
        const form = reactive({ nama: "", nim: "", prodi: "", email: "" });
        const onSubmit = async () => {
            await createUser({ ...form });
            form.nama = "";
            form.nim = "";
            form.prodi = "";
            form.email = "";
        };
        return { form, onSubmit };
    },
};
</script>
